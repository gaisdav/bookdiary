import { UserInfo } from '@firebase/auth';

export interface IUser extends UserInfo {}

export type TCreatUser = {
  email: string;
  password: string;
  name: string;
};
