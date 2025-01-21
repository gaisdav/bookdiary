import { TUser, TCreatUser } from '@/data/user/enitites/user';

export type TProfileErrors = {
  emailVerificationError?: string | null;
  resetPasswordError?: string | null;
};

export interface ProfileState {
  registrationLoading?: boolean;
  resetPasswordLoading?: boolean;
  emailVerificationLoading?: boolean;
  profileLoading: boolean;
  profile: TUser | null;
  error: string | null;
  errors: TProfileErrors;
}

export interface ProfileActions {
  initProfile: () => void;
  createUser: (user: TCreatUser) => void;
  sendEmailVerification: () => void;
  resetPassword: (email: string) => void;

  resetErrors: (key: keyof TProfileErrors) => void;
}
