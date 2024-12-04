import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase.config.ts';
import { TAddReview } from '@/data/review/services/types.ts';
import { IReview } from '@/data/review/entity/types.ts';

export class ReviewsService {
  static async addReview({
    bookId,
    review,
    userId,
    rating,
  }: TAddReview): Promise<IReview | null> {
    try {
      const reviewsCollectionRef = collection(db, 'reviews', 'books', bookId);

      const { id } = await addDoc(reviewsCollectionRef, {
        bookId,
        review,
        userId,
        rating,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return {
        id,
        bookId,
        review,
        userId,
        rating,

        //TODO fix this
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } catch (e) {
      console.error('Error adding review: ', e);
      return null;
    }
  }

  static async getReviews(bookId: string): Promise<IReview[]> {
    const reviewsRef = collection(db, 'reviews', 'books', bookId);
    const docSnap = await getDocs(reviewsRef);

    return docSnap.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as IReview,
    );
  }
}
