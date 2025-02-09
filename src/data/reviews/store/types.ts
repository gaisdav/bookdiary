import { IReview } from '@/data/reviews/entity/types.ts';
import { TAddReview } from '@/data/reviews/services/types.ts';

export interface ReviewsState {
  loading: boolean;
  reviews: IReview[] | null;
}

export interface ReviewsActions {
  reset: () => void;
  getBookReviews: (bookId: string) => Promise<void>;
  getUserReviews: (userId: number) => Promise<void>;
  addReview: (params: TAddReview) => Promise<void>;
}
