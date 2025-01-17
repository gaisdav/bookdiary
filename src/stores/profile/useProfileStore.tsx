import { create } from 'zustand/index';
import { ProfileActions, ProfileState } from '@/stores/profile/types.ts';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase.config.ts';
import { TCreatUser } from '@/data/user/enitites/user';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

const initialState: ProfileState = {
  registrationLoading: false,
  profileLoading: true,
  emailVerificationLoading: false,
  profile: null,
  error: null,
  errors: {},
};

export const useProfileStore = create<ProfileState & ProfileActions>(
  (set, get) => ({
    ...initialState,

    initProfile: async () => {
      set({ profileLoading: true });

      onAuthStateChanged(auth, (user) => {
        set({ profile: user, profileLoading: false });
      });
    },

    sendEmailVerification: async () => {
      set({ emailVerificationLoading: true });
      try {
        const user = auth.currentUser;
        if (user) {
          await sendEmailVerification(user);
          set({
            errors: {
              ...get().errors,
              emailVerificationError: null,
            },
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          set({
            errors: {
              ...get().errors,
              emailVerificationError: error.message,
            },
          });
        } else {
          set({
            errors: {
              ...get().errors,
              emailVerificationError:
                'An error occurred while sending email verification',
            },
          });
        }
        throw error;
      } finally {
        set({ emailVerificationLoading: false });
      }
    },

    createUser: async ({ email, password, name: displayName }: TCreatUser) => {
      set({ registrationLoading: true });
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const user = userCredential.user;
        await updateProfile(user, { displayName });
        // Сохранение данных пользователя в Firestore
        const userData = {
          id: user.uid,
          email: user.email,
          displayName,
          createdAt: serverTimestamp(),
        };

        // TODO сделать согласно инструкции по ссылке для создания и удаления пользователя в Firestore
        //  https://firebase.google.com/docs/functions/auth-events?hl=ru
        await setDoc(doc(db, 'users', user.uid), userData);

        get().sendEmailVerification();
      } catch (error) {
        if (error instanceof Error) {
          set({ error: error.message });
        } else {
          set({ error: 'An error occurred while creating a user' });
        }
      } finally {
        set({ registrationLoading: false });
      }
    },
  }),
);
