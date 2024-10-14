import { ref, set, push, child } from 'firebase/database';
import { db } from '@/firebase.config.ts';

const key = 'books/';
const booksRef = ref(db, key);

export const useBooksController = () => {
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

  return {
    removeBook,
    createBook,
  };
};

interface IBookCreateParams {
  title: string;
}
