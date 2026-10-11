// Supabase connection details, shared by the public site and the admin console.
//
// Requires two env vars (in .env.local and in the Vercel project):
//   NEXT_PUBLIC_SUPABASE_URL       e.g. https://abcd1234.supabase.co
//   NEXT_PUBLIC_SUPABASE_ANON_KEY  the project's anon / publishable key
// Both are safe to expose: row level security decides what the anon key can do.

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "") ?? "";
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

/** Headers for a direct REST call. Pass a signed-in user's access token to act as them. */
export function supabaseHeaders(accessToken: string = SUPABASE_KEY): Record<string, string> {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
}

/** Name of the public storage bucket that admin-uploaded images go into. */
export const MEDIA_BUCKET = "media";
