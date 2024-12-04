import { addDoc, serverTimestamp, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase.config.ts';
import { TAddReview } from '@/data/review/services/types.ts';

export class ReviewsService {
  static async addReview({ bookId, review, userId, rating }: TAddReview) {
    try {
      const reviewsCollectionRef = collection(db, 'reviews', 'books', bookId);

      await addDoc(reviewsCollectionRef, {
        bookId,
        review,
        userId,
        rating,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (e) {
      console.error('Error adding review: ', e);
    }
  }
}
