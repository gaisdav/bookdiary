import { TUser, TCreatUser } from '@/stores/user/enitites/user';

export type TProfileErrors = {
  resetPasswordError?: string | null;
  updatePasswordError?: string | null;
  signInError?: string | null;
  signUpError?: string | null;
  signOutError?: string | null;
};

export type TUserSignInParams = {
  email: string;
  password: string;
};

export interface ProfileState {
  signInLoading?: boolean;
  registrationLoading?: boolean;
  resetPasswordLoading?: boolean;
  updatePasswordLoading?: boolean;
  profileLoading: boolean;
  profile: TUser | null;
  error: string | null;
  errors: TProfileErrors;
}

export interface ProfileActions {
  initProfile: () => void;
  createUser: (user: TCreatUser) => void;
  resetPassword: (email: string) => void;
  updatePassword: (password: string) => Promise<void>;
  signIn: (params: TUserSignInParams) => void;
  signOut: () => void;

  resetErrors: (key: keyof TProfileErrors) => void;
  resetStore: () => void;
}
