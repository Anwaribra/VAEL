-- 0001_invitations.sql
-- VAEL Simplified Free & Premium Invitations Database Schema & Security Functions

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA extensions;

-- 1. Create Invitations Table
CREATE TABLE IF NOT EXISTS public.invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  config JSONB NOT NULL,
  photo_path TEXT NULL,
  edit_token_hash BYTEA NOT NULL,
  event_date DATE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ NULL
);

-- 2. Indexes for fast lookup & cleanup
CREATE INDEX IF NOT EXISTS idx_invitations_slug ON public.invitations (slug) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_invitations_created_at ON public.invitations (created_at);

-- 3. Enable RLS with ZERO policies for anon (direct table access blocked)
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- 4. SECURITY DEFINER Functions for safe client API access

-- A. Create Invitation Function
CREATE OR REPLACE FUNCTION public.create_invitation(
  p_config JSONB,
  p_photo_path TEXT DEFAULT NULL
)
RETURNS TABLE (slug TEXT, edit_token TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, pg_temp
AS $$
DECLARE
  v_slug TEXT;
  v_raw_token TEXT;
  v_token_bytes BYTEA;
  v_token_hash BYTEA;
  v_event_date DATE;
  v_expires_at TIMESTAMPTZ;
  v_recent_count INT;
  v_design TEXT;
  v_type TEXT;
BEGIN
  -- Rate limiting: max 60 invitations per minute globally
  SELECT COUNT(*) INTO v_recent_count
  FROM public.invitations
  WHERE created_at > now() - INTERVAL '1 minute';

  IF v_recent_count >= 60 THEN
    RAISE EXCEPTION 'Global rate limit exceeded. Please wait a minute.' USING ERRCODE = 'P0001';
  END IF;

  -- Server-side validation
  IF octet_length(p_config::text) > 16384 THEN
    RAISE EXCEPTION 'Configuration payload exceeds maximum size.' USING ERRCODE = '22001';
  END IF;

  v_design := p_config->>'design';
  IF v_design NOT IN ('ivory', 'noir', 'oud', 'azure') THEN
    RAISE EXCEPTION 'Invalid design style.' USING ERRCODE = '22023';
  END IF;

  v_type := p_config->>'type';
  IF v_type IS NOT NULL AND v_type NOT IN ('wedding', 'engagement', 'archive') THEN
    RAISE EXCEPTION 'Invalid invitation type.' USING ERRCODE = '22023';
  END IF;

  IF (p_config->>'date') IS NULL OR NOT (p_config->>'date' ~ '^\d{4}-\d{2}-\d{2}$') THEN
    v_event_date := CURRENT_DATE;
  ELSE
    v_event_date := (p_config->>'date')::DATE;
  END IF;

  v_expires_at := (v_event_date + INTERVAL '180 days')::TIMESTAMPTZ;

  -- Validate photo path length if provided
  IF p_photo_path IS NOT NULL AND length(p_photo_path) > 4096 THEN
    RAISE EXCEPTION 'Invalid photo path format.' USING ERRCODE = '22023';
  END IF;

  -- Generate 10-char URL-safe random slug
  v_slug := lower(substring(encode(gen_random_bytes(8), 'hex') from 1 for 10));

  -- Generate 24 random bytes token & compute SHA256 hash
  v_token_bytes := gen_random_bytes(24);
  v_raw_token := replace(replace(encode(v_token_bytes, 'base64'), '+', '-'), '/', '_');
  v_token_hash := digest(v_raw_token, 'sha256');

  -- Insert record
  INSERT INTO public.invitations (
    slug,
    config,
    photo_path,
    edit_token_hash,
    event_date,
    expires_at
  ) VALUES (
    v_slug,
    p_config,
    p_photo_path,
    v_token_hash,
    v_event_date,
    v_expires_at
  );

  RETURN QUERY SELECT v_slug, v_raw_token;
END;
$$;

-- B. Get Invitation Function (Public read)
CREATE OR REPLACE FUNCTION public.get_invitation(p_slug TEXT)
RETURNS TABLE (
  slug TEXT,
  config JSONB,
  photo_path TEXT,
  event_date DATE,
  expires_at TIMESTAMPTZ,
  is_expired BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, pg_temp
AS $$
BEGIN
  RETURN QUERY
  SELECT
    i.slug,
    i.config,
    i.photo_path,
    i.event_date,
    i.expires_at,
    (now() > i.expires_at) AS is_expired
  FROM public.invitations i
  WHERE i.slug = p_slug AND i.deleted_at IS NULL;
END;
$$;

-- C. Update Invitation Function (Requires edit token)
CREATE OR REPLACE FUNCTION public.update_invitation(
  p_slug TEXT,
  p_token TEXT,
  p_config JSONB,
  p_photo_path TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, pg_temp
AS $$
DECLARE
  v_token_hash BYTEA;
  v_event_date DATE;
  v_expires_at TIMESTAMPTZ;
  v_updated INT;
BEGIN
  v_token_hash := digest(p_token, 'sha256');
  
  IF (p_config->>'date') IS NULL OR NOT (p_config->>'date' ~ '^\d{4}-\d{2}-\d{2}$') THEN
    v_event_date := CURRENT_DATE;
  ELSE
    v_event_date := (p_config->>'date')::DATE;
  END IF;

  v_expires_at := (v_event_date + INTERVAL '180 days')::TIMESTAMPTZ;

  UPDATE public.invitations
  SET
    config = p_config,
    photo_path = COALESCE(p_photo_path, photo_path),
    event_date = v_event_date,
    expires_at = v_expires_at
  WHERE slug = p_slug
    AND edit_token_hash = v_token_hash
    AND deleted_at IS NULL;

  GET DIAGNOSTICS v_updated = ROW_COUNT;
  RETURN v_updated > 0;
END;
$$;

-- D. Delete Invitation Function (Soft Delete)
CREATE OR REPLACE FUNCTION public.delete_invitation(
  p_slug TEXT,
  p_token TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, pg_temp
AS $$
DECLARE
  v_token_hash BYTEA;
  v_updated INT;
BEGIN
  v_token_hash := digest(p_token, 'sha256');

  UPDATE public.invitations
  SET deleted_at = now()
  WHERE slug = p_slug
    AND edit_token_hash = v_token_hash
    AND deleted_at IS NULL;

  GET DIAGNOSTICS v_updated = ROW_COUNT;
  RETURN v_updated > 0;
END;
$$;

-- 5. Storage Bucket Setup
INSERT INTO storage.buckets (id, name)
VALUES ('invitation-photos', 'invitation-photos')
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for invitation-photos
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Public Read invitation-photos' AND tablename = 'objects'
  ) THEN
    CREATE POLICY "Public Read invitation-photos"
      ON storage.objects FOR SELECT
      USING (bucket_id = 'invitation-photos');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Anon Upload invitation-photos' AND tablename = 'objects'
  ) THEN
    CREATE POLICY "Anon Upload invitation-photos"
      ON storage.objects FOR INSERT
      WITH CHECK (bucket_id = 'invitation-photos');
  END IF;
END $$;
