// Supabase client for the browser (optional, read-only use).
// The FastAPI backend in backend/ is still the primary data path —
// frontend/lib/api.js talks to FastAPI, which talks to Supabase.
// This client is only for direct Supabase reads if a page ever needs them.
// It uses only the public anon key (NEXT_PUBLIC_* vars); the service-role
// key must NEVER be used in the frontend.
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);
export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey)
  : null;
