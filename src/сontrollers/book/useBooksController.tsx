import { useState } from 'react';
import { ref, set, push, child } from 'firebase/database';
import { db } from '@/firebase.config';
import { TBookList, TGoogleBookSearch } from './types.ts';
import { GoogleBookItems } from './GoogleBook.decorator.ts';
import { IBook } from '@/enitites/book/types';

const key = 'books/';
const booksRef = ref(db, key);

export const useBooksController = () => {
  const [searching, setSearching] = useState(false);
  const [bookList, setBookList] = useState<TBookList | null>(null);
  const [book, setBook] = useState<IBook | null>(null);

  // useEffect(() => {
  //   setListLoading(true);
  //   onValue(booksRef, (snapshot) => {
  //     const data: IBook[] = [];
  //
  //     snapshot.forEach((childSnapshot) => {
  //       data.push(childSnapshot.val());
  //     });
  //
  //     setBooks(data);
  //     setListLoading(false);
  //   });
  // }, []);

  const createBook = async (params: IBookCreateParams) => {
    const newBookRef = push(booksRef);
    const id = newBookRef.key;
    await set(newBookRef, { id, ...params });
  };

  const removeBook = async (id: string) => {
    await set(child(booksRef, id), null);
  };

  // const getBook = async (id: string) => {
  //   const snapshot = await get(child(booksRef, id));
  //   return await snapshot.val();
  // };

  const getBook = async (id: string) => {
    try {
      const result = await fetch(
        //TODO вынести в endpoints
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${import.meta.env.BOOK_GOOGLE_API_KEY}`,
      );

      console.log(result);

      const data = (await result.json()) as TGoogleBookSearch;

      const decoratedData = new GoogleBookItems(data);

      // setBookList(decoratedData);
    } catch (error) {
      console.error(error);
    } finally {
      setSearching(false);
    }
  };

  const searchBook = async (query: string) => {
    setSearching(true);
    try {
      const result = await fetch(
        //TODO вынести в endpoints
        // add pagination
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${import.meta.env.BOOK_GOOGLE_API_KEY}`,
      );

      const data = (await result.json()) as TGoogleBookSearch;

      const decoratedData = new GoogleBookItems(data);

      setBookList(decoratedData);
    } catch (error) {
      console.error(error);
    } finally {
      setSearching(false);
    }
  };

  return {
    bookList,
    searching,
    searchBook,
    removeBook,
    getBook,
    createBook,
    book,
  };
};

interface IBookCreateParams {
  title: string;
}
