import { IReview } from '@/stores/reviews/entity/types.ts';

export type TAddReview = Omit<
  IReview,
  'id' | 'createdAt' | 'updatedAt' | 'author'
>;
