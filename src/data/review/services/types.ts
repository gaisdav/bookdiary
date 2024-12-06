import { IReview } from '@/data/review/entity/types.ts';

export type TAddReview = Omit<
  IReview,
  'id' | 'createdAt' | 'updatedAt' | 'author'
>;
