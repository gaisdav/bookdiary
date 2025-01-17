import firebase from 'firebase/compat';

export type TUser = firebase.User;

export type TCreatUser = {
  email: string;
  password: string;
  name: string;
};
