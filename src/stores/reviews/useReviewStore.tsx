import { create } from 'zustand/index';
import { ReviewsActions, ReviewsState } from '@/stores/reviews/types.ts';
import { ReviewsService } from '@/data/review/services';
import { TAddReview } from '@/data/review/services/types.ts';

const initialState: ReviewsState = {
  reviews: null,
};

export const useReviewStore = create<ReviewsState & ReviewsActions>((set) => ({
  ...initialState,

  reset: () => set(initialState),
  getReviews: async (bookId: string) => {
    try {
      const reviews = await ReviewsService.getReviews(bookId);

      set({ reviews });
    } finally {
      // do
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
          reviews: [...(reviews || []), review],
        };
      });
    } finally {
      // do
    }
  },
}));
