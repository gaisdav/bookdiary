import { create } from 'zustand/index';
import { ReviewsActions, ReviewsState } from '@/stores/reviews/types.ts';
import { ReviewsService } from '@/data/review/services';
import { TAddReview } from '@/data/review/services/types.ts';

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

  getUserReviews: async (userId: string) => {
    try {
      const reviews = await ReviewsService.getUserReviews(userId);

      set({ reviews });
    } finally {
      set({ loading: false });
    }
  },
}));
