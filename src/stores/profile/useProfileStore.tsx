import { create } from 'zustand/index';
import {
  ProfileActions,
  ProfileState,
  TProfileErrors,
} from '@/stores/profile/types.ts';
import { TCreatUser, TUser } from '@/stores/user/enitites/user';
import { supabase } from '@/lib/supabase.config.ts';
import { UserDecorator } from '@/stores/profile/UserDecorator.ts';
import { Subscription } from '@supabase/supabase-js';

const initialState: ProfileState = {
  signInLoading: false,
  registrationLoading: false,
  resetPasswordLoading: false,
  updatePasswordLoading: false,
  profileLoading: true,
  profile: null,
  error: null,
  errors: {},
};

let sessionSubscription: null | Subscription = null;

export const useProfileStore = create<ProfileState & ProfileActions>(
  (set, get) => ({
    ...initialState,

    initProfile: async () => {
      set({ profileLoading: true });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        const user = session?.user;
        const profile: TUser | null = user ? new UserDecorator(user) : null;

        set({ profile, profileLoading: false });
        sessionSubscription = subscription;
      });
    },

    resetPassword: async (email: string) => {
      set({ resetPasswordLoading: true });
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });
      set({ resetPasswordLoading: false });

      if (error) {
        set({ errors: { ...get().errors, resetPasswordError: error.message } });
        throw error;
      }
    },

    updatePassword: async (password: string) => {
      set({ updatePasswordLoading: true });
      const { error } = await supabase.auth.updateUser({ password });
      set({ updatePasswordLoading: false });

      if (error) {
        set({
          errors: { ...get().errors, updatePasswordError: error.message },
        });
        throw error;
      }
    },

    signIn: async (params) => {
      set({ signInLoading: true });

      const { error } = await supabase.auth.signInWithPassword(params);

      set({ signInLoading: false });

      if (error) {
        set({
          errors: {
            ...get().errors,
            signInError: error.message,
          },
        });
        throw error;
      }
    },

    signOut: async () => {
      const { error } = await supabase.auth.signOut({ scope: 'local' });

      if (error) {
        set({ errors: { ...get().errors, signOutError: error.message } });
        throw error;
      }
    },

    createUser: async ({ email, password, ...data }: TCreatUser) => {
      set({ registrationLoading: true });
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data,
        },
      });

      set({ registrationLoading: false });

      if (error) {
        set({ errors: { ...get().errors, signUpError: error.message } });
        throw error;
      }
    },

    resetErrors: (key?: keyof TProfileErrors | (keyof TProfileErrors)[]) => {
      if (Array.isArray(key)) {
        const newErrors = { ...get().errors };
        key.forEach((k) => {
          newErrors[k] = null;
        });
        set({ errors: newErrors });
      } else if (key) {
        set({ errors: { ...get().errors, [key]: null } });
      } else {
        set({ errors: {} });
      }
    },

    resetStore: () => {
      sessionSubscription?.unsubscribe();
    },
  }),
);
