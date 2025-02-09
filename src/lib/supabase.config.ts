import { createClient } from '@supabase/supabase-js';
import { Database } from '@/database.types.ts';

if (
  !import.meta.env.BOOK_SUPABASE_URL ||
  !import.meta.env.BOOK_SUPABASE_ANON_KEY
) {
  throw new Error('Supabase URL and Anon Key are required');
}

export const supabase = createClient<Database>(
  import.meta.env.BOOK_SUPABASE_URL.toString(),
  import.meta.env.BOOK_SUPABASE_ANON_KEY.toString(),
);
