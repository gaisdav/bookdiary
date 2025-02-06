import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.BOOK_SUPABASE_URL.toString(),
  import.meta.env.BOOK_SUPABASE_ANON_KEY.toString(),
);
