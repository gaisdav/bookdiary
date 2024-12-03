import { UserInfo } from '@firebase/auth';

export interface IUser extends UserInfo {}

export type TCreatUser = {
  email: string;
  password: string;
  name: string;
};

export interface IUserBook {
  id: string;
  userId: string;
  bookId: string;
  status: string;
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
}
