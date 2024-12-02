import { IReview } from './types.ts';

export class Review implements IReview {
  id: string;
  author: string;
  bookId: string;
  content: string;
  createdAt: string;
  updatedAt: string;

  constructor(review: IReview) {
    this.id = review.id;
    this.author = review.author;
    this.content = review.content;
    this.bookId = review.bookId;
    this.createdAt = review.createdAt;
    this.updatedAt = review.updatedAt;
  }
}
