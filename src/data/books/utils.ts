import { TBookStatus } from '@/data/books/enitites/book/types.ts';

const statuses: TBookStatus[] = ['read', 'reading', 'want-to-read'];

export const isBookStatus = (status: unknown): status is TBookStatus => {
  return statuses.includes(status as TBookStatus);
};
