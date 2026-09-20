import { createClient } from '@supabase/supabase-js';

const supabaseUrl = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_SUPABASE_URL : undefined;
const supabaseAnonKey = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_SUPABASE_ANON_KEY : undefined;

export const supabase = (supabaseUrl && supabaseAnonKey && supabaseUrl.includes('supabase'))
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// In-memory fallback map for Node/testing environments where localStorage is not defined
const memoryStore = new Map<string, string>();

const safeStorage = {
  getItem(key: string): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
    return memoryStore.get(key) || null;
  },
  setItem(key: string, value: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    } else {
      memoryStore.set(key, value);
    }
  },
  removeItem(key: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    } else {
      memoryStore.delete(key);
    }
  }
};

export interface InvitationRecord {
  slug: string;
  config: any;
  photo_path: string | null;
  event_date: string;
  expires_at?: string;
  is_expired?: boolean;
}

/**
 * Creates an invitation via Supabase RPC function (or fallback localStorage).
 */
export async function createInvitation(config: any, photoPath: string | null = null): Promise<{ slug: string; token: string }> {
  if (supabase) {
    const { data, error } = await supabase.rpc('create_invitation', {
      p_config: config,
      p_photo_path: photoPath
    });
    if (error) {
      throw new Error(error.message || 'Failed to create invitation');
    }
    if (data && data[0]) {
      return { slug: data[0].slug, token: data[0].edit_token };
    }
  }

  // Fallback in-memory / localStorage mode for dev/testing when Supabase env is not configured
  const slug = Math.random().toString(36).substring(2, 12);
  const token = Math.random().toString(36).substring(2, 26);
  const record: InvitationRecord = {
    slug,
    config,
    photo_path: photoPath,
    event_date: config.date || new Date().toISOString().split('T')[0],
    is_expired: false
  };

  safeStorage.setItem(`vael_inv_${slug}`, JSON.stringify({ record, token }));

  return { slug, token };
}

/**
 * Gets invitation data by slug.
 */
export async function getInvitation(slug: string): Promise<InvitationRecord | null> {
  if (supabase) {
    const { data, error } = await supabase.rpc('get_invitation', { p_slug: slug });
    if (error || !data || data.length === 0) {
      return null;
    }
    const item = data[0];
    return {
      slug: item.slug,
      config: item.config,
      photo_path: item.photo_path,
      event_date: item.event_date,
      expires_at: item.expires_at,
      is_expired: item.is_expired
    };
  }

  // Fallback
  const stored = safeStorage.getItem(`vael_inv_${slug}`);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return parsed.record;
    } catch {
      // ignore
    }
  }

  // Return default fixture for explicit demo slugs
  if (slug === 'oox6nqb7jj' || slug === 'demo') {
    const { DEFAULT_INVITATION_CONFIG } = await import('../data/invitationDesigns.ts');
    return {
      slug,
      config: DEFAULT_INVITATION_CONFIG,
      photo_path: null,
      event_date: DEFAULT_INVITATION_CONFIG.date,
      is_expired: false
    };
  }

  return null;
}

/**
 * Updates an invitation using the edit token.
 */
export async function updateInvitation(slug: string, token: string, config: any, photoPath: string | null = null): Promise<boolean> {
  if (supabase) {
    const { data, error } = await supabase.rpc('update_invitation', {
      p_slug: slug,
      p_token: token,
      p_config: config,
      p_photo_path: photoPath
    });
    if (error) return false;
    return Boolean(data);
  }

  // Fallback
  const stored = safeStorage.getItem(`vael_inv_${slug}`);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.token === token) {
        parsed.record.config = config;
        if (photoPath) parsed.record.photo_path = photoPath;
        safeStorage.setItem(`vael_inv_${slug}`, JSON.stringify(parsed));
        return true;
      }
    } catch {
      // ignore
    }
  }
  return false;
}

/**
 * Deletes an invitation using the edit token.
 */
export async function deleteInvitation(slug: string, token: string): Promise<boolean> {
  if (supabase) {
    const { data, error } = await supabase.rpc('delete_invitation', {
      p_slug: slug,
      p_token: token
    });
    if (error) return false;
    return Boolean(data);
  }

  // Fallback
  const stored = safeStorage.getItem(`vael_inv_${slug}`);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.token === token) {
        safeStorage.removeItem(`vael_inv_${slug}`);
        return true;
      }
    } catch {
      // ignore
    }
  }
  return false;
}

/**
 * Uploads a resized WebP photo to Supabase storage.
 */
export async function uploadInvitationPhoto(file: Blob): Promise<string | null> {
  const fileName = `${Math.random().toString(36).substring(2, 12)}-${Date.now()}.webp`;
  if (supabase) {
    const { error } = await supabase.storage.from('invitation-photos').upload(fileName, file, {
      contentType: 'image/webp',
      upsert: false
    });
    if (error) {
      console.error('Photo upload error', error);
      return null;
    }
    const { data } = supabase.storage.from('invitation-photos').getPublicUrl(fileName);
    return data.publicUrl;
  }

  // Fallback data URL if FileReader available
  if (typeof FileReader !== 'undefined') {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  }

  return 'data:image/webp;base64,mock';
}

// Aliases
export const createInvitationApi = createInvitation;
export const getInvitationApi = getInvitation;
export const updateInvitationApi = updateInvitation;
export const deleteInvitationApi = deleteInvitation;
export const uploadPhotoApi = uploadInvitationPhoto;
