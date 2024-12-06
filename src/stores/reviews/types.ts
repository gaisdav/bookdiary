import { IReview } from '@/data/review/entity/types.ts';
import { TAddReview } from '@/data/review/services/types.ts';

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
