import { FC, useEffect } from 'react';
import { useBooksController } from '@/сontrollers/book/useBooksController';
import { useParams } from 'react-router-dom';

export const Book: FC = () => {
  const { bookId } = useParams();
  const { getBook } = useBooksController();

  // TODO calling twice
  useEffect(() => {
    getBook(bookId);
  }, []);

  return (
    <div>
      <h1>Book</h1>
    </div>
  );
};
