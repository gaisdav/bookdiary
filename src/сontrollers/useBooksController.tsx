import { get, ref, set, onValue, push, child } from "firebase/database";
import { db } from "../firebase.config.ts";
import { useEffect, useState } from "react";
import { IBook } from "../enitites/book";

const key = "books/";
const booksRef = ref(db, key);
// https://d1csarkz8obe9u.cloudfront.net/posterpreviews/simple-abstract-book-cover-template-design-69afa3c9de25853dd73f0068811d7ec5_screen.jpg?ts=1637027050
export const useBooksController = () => {
  const [listLoading, setListLoading] = useState(false);
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    setListLoading(true);
    onValue(booksRef, (snapshot) => {
      const data: IBook[] = [];

      snapshot.forEach((childSnapshot) => {
        data.push(childSnapshot.val());
      });

      setBooks(data);
      setListLoading(false);
    });
  }, []);

  const createBook = async (params: IBookCreateParams) => {
    const newBookRef = push(booksRef);
    const id = newBookRef.key;
    await set(newBookRef, { id, ...params });
  };

  const removeBook = async (id: string) => {
    await set(child(booksRef, id), null);
  };

  const getBook = async (id: string) => {
    const snapshot = await get(child(booksRef, id));
    return await snapshot.val();
  };

  return { getBook, createBook, removeBook, books, listLoading };
};

interface IBookCreateParams {
  title: string;
}
