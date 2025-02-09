import { create } from 'zustand/index';
import { ReviewsActions, ReviewsState } from '@/data/reviews/store/types.ts';
import { ReviewsService } from '@/data/reviews/services';
import { TAddReview } from '@/data/reviews/services/types.ts';

const initialState: ReviewsState = {
  loading: true,
  reviews: null,
};

export const useReviewStore = create<ReviewsState & ReviewsActions>((set) => ({
  ...initialState,

  reset: () => set(initialState),
  getBookReviews: async (bookId: string) => {
    try {
      const reviews = await ReviewsService.getBookReviews(bookId);

      set({ reviews });
    } finally {
      set({ loading: false });
    }
  },
  addReview: async (params: TAddReview) => {
    try {
      const review = await ReviewsService.addReview(params);

      if (!review) {
        return;
      }

      set(({ reviews }) => {
        return {
          reviews: [review, ...(reviews || [])],
        };
      });
    } finally {
      set({ loading: false });
    }
  },

  getUserReviews: async (userId: number) => {
    try {
      const reviews = await ReviewsService.getUserReviews(userId);

      set({ reviews });
    } finally {
      set({ loading: false });
    }
  },
}));
