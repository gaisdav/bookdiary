import { IUser } from '@/data/user/enitites/user';

export interface ProfileState {
  profileLoading: boolean;
  profile: IUser | null;
}

export interface ProfileActions {
  initProfile: () => void;
}
