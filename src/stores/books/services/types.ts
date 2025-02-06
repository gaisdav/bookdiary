import { TBookStatus } from '@/stores/books/enitites/book/types.ts';

export type TGoogleBookSearchParams = {
  query: string;
  page?: number;
  limit?: number;
};

export type TAddToCollection = {
  userId: string;
  bookId: string;
  status: TBookStatus;
};
