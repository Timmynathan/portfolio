// Called by the admin console after a save, so the public pages pick up the new content
// straight away instead of waiting for the hourly refresh.

import { revalidatePath } from "next/cache";
import { SUPABASE_URL, supabaseConfigured, supabaseHeaders } from "@/lib/supabase";

export async function POST(request: Request) {
  if (!supabaseConfigured) return Response.json({ error: "Supabase is not configured" }, { status: 503 });

  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return Response.json({ error: "Not signed in" }, { status: 401 });

  // The token is checked against Supabase, not trusted: first that it belongs to a real session…
  const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, { headers: supabaseHeaders(token), cache: "no-store" });
  if (!userRes.ok) return Response.json({ error: "Not signed in" }, { status: 401 });
  const user: { id?: string } = await userRes.json();

  // …then that the user is an admin. Row level security only returns the caller's own admins row.
  const adminRes = await fetch(
    `${SUPABASE_URL}/rest/v1/admins?select=user_id&user_id=eq.${encodeURIComponent(user.id ?? "")}`,
    { headers: supabaseHeaders(token), cache: "no-store" }
  );
  const admins: unknown = adminRes.ok ? await adminRes.json() : [];
  if (!Array.isArray(admins) || admins.length === 0) {
    return Response.json({ error: "Not an admin" }, { status: 403 });
  }

  // Every public page reads the same content, so refresh them all.
  revalidatePath("/", "layout");
  return Response.json({ revalidated: true });
}
