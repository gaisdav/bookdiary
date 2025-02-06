import { TBookStatus } from '@/stores/books/enitites/book/types.ts';

export interface ICollection {
  id: string;
  status?: TBookStatus;
}
