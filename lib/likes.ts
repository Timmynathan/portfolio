// Like counts, stored in Supabase (schema: supabase/migrations/20261004000000_likes.sql).
// Talks to Supabase's REST API directly, so no client library is needed.
//
// Requires two env vars (in .env.local and in the Vercel project):
//   NEXT_PUBLIC_SUPABASE_URL       e.g. https://abcd1234.supabase.co
//   NEXT_PUBLIC_SUPABASE_ANON_KEY  the project's anon / publishable key
// Both are safe to expose: row level security limits the anon key to reading counts and calling toggle_like().

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** False when the env vars are missing — likes then stay on this device only and no counts are shown. */
export const likesConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

function headers(): Record<string, string> {
  return {
    apikey: SUPABASE_KEY ?? "",
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
  };
}

/** All counts for the given ids in one request. Ids with no likes yet are simply absent. Throws on failure. */
export async function fetchLikeCounts(ids: string[]): Promise<Record<string, number>> {
  const filter = encodeURIComponent(`in.(${ids.map((id) => `"${id}"`).join(",")})`);
  const res = await fetch(`${SUPABASE_URL}/rest/v1/likes?select=id,count&id=${filter}`, { headers: headers() });
  if (!res.ok) throw new Error(`Fetching like counts failed (${res.status})`);
  const rows: { id: string; count: number }[] = await res.json();
  return Object.fromEntries(rows.map((row) => [row.id, row.count]));
}

/** Adds or removes one like and returns the new count. Throws on failure. */
export async function toggleLike(id: string, liking: boolean): Promise<number> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/toggle_like`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ item_id: id, liking }),
  });
  if (!res.ok) throw new Error(`toggle_like failed (${res.status})`);
  const count: unknown = await res.json();
  if (typeof count !== "number") throw new Error("toggle_like returned an unexpected value");
  return count;
}
