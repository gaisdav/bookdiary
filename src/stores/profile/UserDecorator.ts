import { TUser } from '@/stores/user/enitites/user';
import { User } from '@supabase/supabase-js';

export class UserDecorator implements TUser {
  email: string;
  fullName: string;
  id: string;
  avatarUrl: string;
  createdAt: Date;
  emailConfirmedAt: Date | null;
  updatedAt: Date | null;

  constructor(user: User) {
    this.email = user.email!;
    this.fullName = user.user_metadata.full_name;
    this.id = user.id;
    this.avatarUrl = user.user_metadata.avatar_url;
    this.emailConfirmedAt = user.email_confirmed_at
      ? new Date(user.email_confirmed_at)
      : null;
    this.updatedAt = user.updated_at ? new Date(user.updated_at) : null;
    this.createdAt = new Date(user.created_at);
  }
}
