import { TBookStatus } from '@/data/books/enitites/book/types.ts';

export interface ICollection {
  id: string;
  status?: TBookStatus;
}
