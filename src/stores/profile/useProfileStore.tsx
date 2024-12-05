import { create } from 'zustand/index';
import { ProfileActions, ProfileState } from '@/stores/profile/types.ts';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase.config.ts';

const initialState: ProfileState = {
  profileLoading: true,
  profile: null,
};

export const useProfileStore = create<ProfileState & ProfileActions>((set) => ({
  ...initialState,

  initProfile: async () => {
    set({ profileLoading: true });

    onAuthStateChanged(auth, (user) => {
      set({ profile: user, profileLoading: false });
    });
  },
}));
