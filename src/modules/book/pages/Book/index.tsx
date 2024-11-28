import { FC } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { useBookStore } from '@/modules/book/stores/useBookStore.tsx';
import { Img } from '@/components/Img';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card.tsx';
import css from './Book.module.scss';

export const Book: FC = () => {
  const isPending = useBookStore().bookLoading;
  const book = useBookStore().book;
  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>No data</div>;
  }

  return (
    <PageWrapper>
      <Card>
        <CardContent>
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
              {book.authors && (
                <CardDescription>{book.authors}</CardDescription>
              )}
              {book.categories && (
                <CardDescription>{book.categories}</CardDescription>
              )}
              {book.publishedDate && (
                <CardDescription>{book.publishedDate}</CardDescription>
              )}
            </div>
          </div>
          {book.description && (
            <CardDescription>{book.description}</CardDescription>
          )}
        </CardContent>
      </Card>
    </PageWrapper>
  );
};
