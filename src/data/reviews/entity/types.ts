import { Timestamp } from '@firebase/firestore';
import { TUser } from '@/data/user/enitites/user';

export interface IReview {
  id: string;
  rating: number;
  review: string;
  bookId: string;
  userId: string;
  author: TUser | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
