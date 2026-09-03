import { createClient } from "@supabase/supabase-js";

// Publishable keys are safe in browser code; RLS protects member-owned rows.
export const supabase = createClient(
  "https://uzqaodfmnrjrsbvxhlmh.supabase.co",
  "sb_publishable_3ukkjs-QtgauXjmOrcDAVg_XBWzh2rd",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);
