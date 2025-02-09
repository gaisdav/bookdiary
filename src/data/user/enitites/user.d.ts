import { User } from '@supabase/supabase-js';

export type TUser = {
  id: number;
  provider_id: string | null;
  email: string;
  fullName: string;
  avatarUrl?: string;
  emailConfirmedAt?: Date | null;
  updatedAt: Date | null;
  createdAt: Date;
  user_metadata: User;
};

export type TCreatUser = {
  email: string;
  password: string;
  full_name: string;
};
