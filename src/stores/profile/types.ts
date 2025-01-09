import { TUser, TCreatUser } from '@/data/user/enitites/user';

export interface ProfileState {
  profileLoading: boolean;
  profile: TUser | null;
  error: string | null;
}

export interface ProfileActions {
  initProfile: () => void;
  createUser: (user: TCreatUser) => void;
}
