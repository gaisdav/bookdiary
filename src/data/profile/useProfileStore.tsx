import { create } from 'zustand/index';
import {
  ProfileActions,
  ProfileState,
  TProfileErrors,
} from '@/data/profile/types.ts';
import { TCreatUser, TUser } from '@/data/user/enitites/user';
import { supabase } from '@/lib/supabase.config.ts';
import { UserDecorator } from '@/data/profile/UserDecorator.ts';
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
      } = supabase.auth.onAuthStateChange((event, session) => {
        const providerUser = session?.user;

        if (!providerUser) {
          set({ profile: null, profileLoading: false });
          return;
        }

        if (event === 'SIGNED_IN') {
          supabase
            .from('users')
            .select('*')
            .eq('provider_id', providerUser.id)
            .single()
            .then(({ data: DBUser, error }) => {
              if (error) {
                set({
                  profile: null,
                  profileLoading: false,
                  errors: { ...get().errors, signInError: error.message },
                });
                return;
              }

              if (!DBUser) {
                set({ profile: null, profileLoading: false });
                return;
              }

              const oldProfile = get().profile;
              if (oldProfile && DBUser.updated_at === oldProfile.updatedAt) {
                return;
              }

              const profile: TUser = new UserDecorator(DBUser.id, providerUser);

              set({ profile, profileLoading: false });
              sessionSubscription = subscription;
            });
        }
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
      const { origin, pathname } = window.location;

      const emailRedirectTo = origin + pathname;
      console.log(emailRedirectTo);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data,
          emailRedirectTo,
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
