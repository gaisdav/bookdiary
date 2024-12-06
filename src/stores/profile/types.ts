import { IUser, TCreatUser } from '@/data/user/enitites/user';

export interface ProfileState {
  profileLoading: boolean;
  profile: IUser | null;
  error: string | null;
}

export interface ProfileActions {
  initProfile: () => void;
  createUser: (user: TCreatUser) => void;
}
