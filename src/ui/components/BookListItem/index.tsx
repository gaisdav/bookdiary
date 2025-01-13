import { FC } from 'react';
import { IBook } from '@/data/books/enitites/book/types.ts';
import { Link } from 'react-router-dom';
import css from './BookItem.module.scss';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/ui/components/ui/card.tsx';
import { Img } from '@/ui/components/Img';

type TBookItem = {
  book: IBook;
};

export const BookListItem: FC<TBookItem> = ({ book }) => {
  return (
    <Card className={`${css.card}`}>
      <CardContent>
        <Link to={book.id} className={css.content}>
          <div className={css.mainInfo}>
            {book.cover && (
              <Img
                className={css.cover}
                loading="lazy"
                src={book.cover}
                alt={`${book.title} ${book.authors.join(', ')}`}
              />
            )}
            <div className={css.titles}>
              {book.title && <CardTitle>{book.title}</CardTitle>}
              {book.subtitle && (
                <CardDescription>{book.subtitle}</CardDescription>
              )}
              {book.authors && book.authors.length > 0 && (
                <CardDescription>Authors: {book.authors}</CardDescription>
              )}
              {book.categories && book.categories.length > 0 && (
                <CardDescription>Category: {book.categories}</CardDescription>
              )}
            </div>
          </div>

          {book.description && (
            <CardDescription className={css.description}>
              {book.description}
            </CardDescription>
          )}

          <div>
            {book.language && (
              <CardDescription>Language : {book.language}</CardDescription>
            )}
            {book.pageCount && (
              <CardDescription>Pages: {book.pageCount}</CardDescription>
            )}
            {book.publishedDate && (
              <CardDescription>
                Published date: {book.publishedDate}
              </CardDescription>
            )}
            {book.status && (
              <CardDescription>Status: {book.status}</CardDescription>
            )}
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};
