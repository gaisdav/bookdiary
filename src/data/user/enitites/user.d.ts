import firebase from 'firebase/compat';
import UserInfo = firebase.UserInfo;

export type TUser = UserInfo;

export type TCreatUser = {
  email: string;
  password: string;
  name: string;
};
