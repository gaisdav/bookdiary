import { TUser, TCreatUser } from '@/data/user/enitites/user';

export interface ProfileState {
  registrationLoading?: boolean;
  emailVerificationLoading?: boolean;
  profileLoading: boolean;
  profile: TUser | null;
  error: string | null;
  errors: {
    emailVerificationError?: string | null;
  };
}

export interface ProfileActions {
  initProfile: () => void;
  createUser: (user: TCreatUser) => void;
  sendEmailVerification: () => void;
}
