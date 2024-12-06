import { Timestamp } from '@firebase/firestore';
import { IUser } from '@/data/user/enitites/user';

export interface IReview {
  id: string;
  rating: number;
  review: string;
  bookId: string;
  userId: string;
  author: IUser | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
