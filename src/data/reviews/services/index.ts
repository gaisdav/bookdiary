import { IReview } from '@/data/reviews/enitites/review/types.ts';
import { TCreateUpdateReview } from '@/data/reviews/services/types.ts';

export class ReviewService {
  static addReview(bookId: string, review: TCreateUpdateReview): Promise<void> {
    return Promise.resolve(undefined);
  }

  static deleteReview(reviewId: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  static getReview(reviewId: string): Promise<IReview | null> {
    return Promise.resolve(null);
  }

  static getReviewByBookId(bookId: string): Promise<IReview | null> {
    return Promise.resolve(null);
  }

  static getReviews(bookId: string): Promise<IReview[]> {
    return Promise.resolve([]);
  }

  static updateReview(review: TCreateUpdateReview): Promise<void> {
    return Promise.resolve(undefined);
  }
}
