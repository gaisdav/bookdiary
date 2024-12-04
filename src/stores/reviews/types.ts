import { IReview } from '@/data/review/entity/types.ts';
import { TAddReview } from '@/data/review/services/types.ts';

export interface ReviewsState {
  reviews: IReview[] | null;
}

export interface ReviewsActions {
  reset: () => void;
  getReviews: (bookId: string) => Promise<void>;
  addReview: (params: TAddReview) => Promise<void>;
}
