import { IReview } from '@/data/reviews/entity/types.ts';

export type TAddReview = Omit<
  IReview,
  'id' | 'createdAt' | 'updatedAt' | 'author'
>;
