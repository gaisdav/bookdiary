import { FC } from 'react';
import { IBook } from '@/data/books/enitites/book/types.ts';
import { Link } from 'react-router-dom';
import css from './BookItem.module.scss';
import { Img } from '@/ui/components/Img';

type TBookItem = {
  book: IBook;
};

export const BookCardItem: FC<TBookItem> = ({ book }) => {
  return (
    <Link to={book.id} className="rounded overflow-hidden">
      {book.cover ? (
        <Img
          className={css.cover}
          loading="lazy"
          src={book.cover}
          alt={`${book.title} ${book.authors.join(', ')}`}
        />
      ) : book.title ? (
        <div className={css.empty}>{book.title}</div>
      ) : null}
    </Link>
  );
};
