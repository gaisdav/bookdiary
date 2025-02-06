import {
  constructGoogleBooksUrl,
  constructGoogleBookUrl,
} from '@/stores/books/services/utils.ts';
import {
  TAddToCollection,
  TGoogleBookSearchParams,
} from '@/stores/books/services/types.ts';
import { TGoogleBook } from '@/stores/books/store/types.ts';
import {
  setDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
} from 'firebase/firestore';
import { db } from '@/lib/firebase.config.ts';
import { ICollection } from '@/stores/collection/enitites/types.ts';
import { GoogleBook } from '@/ui/pages/book/decorators/GoogleBook.decorator.ts';
import { GoogleBookItems } from '@/ui/pages/book/decorators/GoogleBooks.decorator.ts';
import { where } from '@firebase/firestore';
import { TBookStatus } from '@/stores/books/enitites/book/types.ts';

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

  static async getUserCollection(userId: string) {
    try {
      // Создаем ссылку на подколлекцию "collections" пользователя
      const booksCollectionRef = collection(db, 'collections', userId, 'books');

      // Получаем все документы из коллекции
      const querySnapshot = await getDocs(booksCollectionRef);

      // Преобразуем документы в массив объектов
      const collections: ICollection[] = querySnapshot.docs.map((doc) => ({
        id: doc.id, // ID документа (bookId)
        ...doc.data(), // Остальные данные документа (status)
      }));

      const googleBooks = await Promise.all(
        collections.map((collection) =>
          fetch(
            `https://www.googleapis.com/books/v1/volumes/${collection.id}`,
          ).then((res) => res.json()),
        ),
      );

      return googleBooks.map(
        (book, index) =>
          new GoogleBook({ ...book, status: collections[index].status }),
      );
    } catch (e) {
      console.error('Error getting user collection: ', e);
      return [];
    }
  }

  static async getUserBooksByStatus(userId: string, status: TBookStatus) {
    try {
      const booksCollectionRef = collection(db, 'collections', userId, 'books');

      // Добавляем условие фильтрации, чтобы получить только книги со статусом "read"
      const queryRef = query(booksCollectionRef, where('status', '==', status));

      // Выполняем запрос
      const querySnapshot = await getDocs(queryRef);

      // Преобразуем документы в массив объектов
      const collections: ICollection[] = querySnapshot.docs.map((doc) => ({
        id: doc.id, // ID документа (bookId)
        ...doc.data(), // Остальные данные документа (status)
      }));

      // Получаем информацию о книгах из Google Books API
      const googleBooks = await Promise.all(
        collections.map((collection) =>
          fetch(
            `https://www.googleapis.com/books/v1/volumes/${collection.id}`,
          ).then((res) => res.json()),
        ),
      );

      // Возвращаем массив GoogleBook с добавлением статуса
      return googleBooks.map(
        (book, index) =>
          new GoogleBook({ ...book, status: collections[index].status }),
      );
    } catch (e) {
      console.error('Error getting read books: ', e);
      return [];
    }
  }
}
