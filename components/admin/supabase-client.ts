import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL, supabaseConfigured } from "@/lib/supabase";

/** Browser client for the admin console (login session, saving content, uploading images). Null if the env vars are missing. */
export const supabase = supabaseConfigured ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;
