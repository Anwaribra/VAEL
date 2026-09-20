# Supabase Setup Guide for VAEL

Follow these steps to set up Supabase backend for VAEL invitations:

1. **Create Supabase Project**:
   - Go to [https://supabase.com](https://supabase.com) and create a new project.
   - Copy your Project URL and `anon` public API Key.

2. **Set Environment Variables**:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Set `VITE_SUPABASE_URL` to your project URL.
   - Set `VITE_SUPABASE_ANON_KEY` to your `anon` key.

3. **Apply Database Migration**:
   - In Supabase Dashboard, navigate to **SQL Editor**.
   - Paste and run the contents of `supabase/migrations/0001_invitations.sql`.
   - Ensure `pgcrypto` extension is active (enabled by default in Supabase).

4. **Verify Storage Bucket**:
   - Navigate to **Storage** in Supabase Dashboard.
   - Verify that `invitation-photos` bucket is created with `Public Read` and `Anon Insert` access.

5. **Direct Table Access Security Check (Curl Test)**:
   - Run the following curl command to verify that direct `SELECT` on `invitations` returns empty / 401:
     ```bash
     curl -i -X GET "${VITE_SUPABASE_URL}/rest/v1/invitations" \
       -H "apikey: ${VITE_SUPABASE_ANON_KEY}" \
       -H "Authorization: Bearer ${VITE_SUPABASE_ANON_KEY}"
     ```
