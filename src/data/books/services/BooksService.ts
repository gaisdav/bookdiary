import { GoogleBookItems } from '@/ui/book/decorators/GoogleBooks.decorator.ts';
import {
  constructGoogleBooksUrl,
  constructGoogleBookUrl,
} from '@/data/books/services/utils.ts';
import {
  TAddToCollection,
  TGoogleBookSearchParams,
} from '@/data/books/services/types.ts';
import { GoogleBook } from '@/ui/book/decorators/GoogleBook.decorator.ts';
import { TGoogleBook } from '@/stores/books/types.ts';
import { setDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase.config.ts';

const defaultPage = 1;
const defaultLimit = 10;

export class BooksService {
  static async searchBooks(
    params: TGoogleBookSearchParams = {
      page: defaultPage,
      limit: defaultLimit,
      query: '',
    },
  ) {
    const { query = '', limit = defaultLimit, page = defaultPage } = params;
    const url = constructGoogleBooksUrl(query, limit, page);

    const result = await fetch(url.toString());
    const data = await result.json();
    return new GoogleBookItems(data, limit, page);
  }

  static async getBook({ bookId, userId }: Omit<TAddToCollection, 'status'>) {
    const url = constructGoogleBookUrl(bookId);
    const result = await fetch(url);
    const data = (await result.json()) as TGoogleBook;
    const documentData = await BooksService.getBookStatus({
      userId,
      bookId,
    });

    return new GoogleBook({ ...data, status: documentData?.status });
  }

  static async addToCollection({ userId, bookId, status }: TAddToCollection) {
    try {
      // Создаем ссылку на документ для пользователя с userId
      const docRef = doc(db, 'collections', userId, 'books', bookId);

      // Обновляем или создаем данные в Firestore
      await setDoc(docRef, {
        status: status,
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  static async removeFromCollection({
    userId,
    bookId,
  }: Omit<TAddToCollection, 'status'>) {
    try {
      // Создаем ссылку на документ для пользователя с userId
      const docRef = doc(db, 'collections', userId, 'books', bookId);

      await deleteDoc(docRef);
    } catch (e) {
      console.error('Error removing document: ', e);
    }
  }

  static async getBookStatus({
    userId,
    bookId,
  }: Omit<TAddToCollection, 'status'>) {
    try {
      const docRef = doc(db, 'collections', userId, 'books', bookId);

      const docSnap = await getDoc(docRef);

      return docSnap.data();
    } catch (e) {
      console.error('Error getting document: ', e);
      return null;
    }
  }
}
