import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase.config.ts';
import { TAddReview } from '@/data/review/services/types.ts';
import { IReview } from '@/data/review/entity/types.ts';
import { Timestamp } from '@firebase/firestore';
import { IUser } from '@/data/user/enitites/user';

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

      const author = await getDoc(doc(db, 'users', userId));
      return {
        id,
        bookId,
        review,
        userId,
        rating,
        author: author.data() as IUser,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
    } catch (e) {
      console.error('Error adding review: ', e);
      return null;
    }
  }

  static async getReviews(bookId: string): Promise<IReview[]> {
    try {
      const reviewsRef = collection(db, 'reviews', 'books', bookId);
      // Создаем запрос с сортировкой по полю "createdAt" в порядке убывания (desc)
      const reviewsQuery = query(reviewsRef, orderBy('createdAt', 'desc'));

      const docSnap = await getDocs(reviewsQuery);

      // Для каждого отзыва получить данные автора из коллекции "users"
      return await Promise.all(
        docSnap.docs.map(async (snap) => {
          const data = snap.data();
          const userId = data.userId;

          // Получаем данные автора
          const authorDoc = await getDoc(doc(db, 'users', userId));
          const authorData = authorDoc.exists()
            ? (authorDoc.data() as IUser)
            : null;

          return {
            id: snap.id,
            ...data,
            author: authorData,
          } as IReview;
        }),
      );
    } catch (e) {
      console.error('Error getting reviews: ', e);
      return [];
    }
  }
}
