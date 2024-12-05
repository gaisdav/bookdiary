import { Timestamp } from '@firebase/firestore';

export interface IReview {
  id: string;
  rating: number;
  review: string;
  bookId: string;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
