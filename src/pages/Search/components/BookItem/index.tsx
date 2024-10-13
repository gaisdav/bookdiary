import { FC } from 'react';
import { IBook } from '@/enitites/book/types';
import { Link } from 'react-router-dom';
import { ROUTE } from '@/routes/router';

type TBookItem = {
  book: IBook;
  openBook: (id: string) => void;
};

export const BookItem: FC<TBookItem> = ({ book, openBook }) => {
  const handleOpenBook = async () => {
    await openBook(book.id);
  };

  return (
    <div>
      <br />
      {book.cover && (
        <img
          loading={'lazy'}
          src={book.cover}
          alt={`${book.title} ${book.authors.join(', ')}`}
        />
      )}
      <div>{book.title}</div>
      <div>{book.authors}</div>
      <div>{book.categories}</div>
      <div>{book.description}</div>
      <div>{book.language}</div>
      <div>{book.pageCount}</div>
      <div>{book.publishedDate}</div>
      <br />
      <Link to={book.id}>open</Link>
      <br />
      <hr />
    </div>
  );
};
