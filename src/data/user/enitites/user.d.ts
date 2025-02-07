export type TUser = {
  email: string;
  fullName: string;
  id: string;
  avatarUrl?: string;
  emailConfirmedAt?: Date | null;
  updatedAt: Date | null;
  createdAt: Date;
};

export type TCreatUser = {
  email: string;
  password: string;
  full_name: string;
};
