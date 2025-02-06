import { IReview } from '@/stores/reviews/entity/types.ts';
import { TAddReview } from '@/stores/reviews/services/types.ts';

export interface ReviewsState {
  loading: boolean;
  reviews: IReview[] | null;
}

export interface ReviewsActions {
  reset: () => void;
  getBookReviews: (bookId: string) => Promise<void>;
  getUserReviews: (userId: string) => Promise<void>;
  addReview: (params: TAddReview) => Promise<void>;
}
