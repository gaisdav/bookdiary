import { IUser } from '@/data/user/enitites/user';
import { IBook } from '@/data/books/enitites/book/types.ts';

export interface IReview {
  id: string;
  authorId: IUser;
  content: string;
  book: IBook;
  createdAt: string;
  updatedAt: string;
}
