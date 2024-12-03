import { IReview } from '@/data/reviews/enitites/review/types.ts';

export type TCreateUpdateReview = Omit<IReview, 'id'>;
