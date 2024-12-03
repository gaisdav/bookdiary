import { FC } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { useBookStore } from '@/stores/books/useBookStore.tsx';
import { Img } from '@/components/Img';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card.tsx';
import css from './Book.module.scss';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TBookStatus } from '@/data/books/enitites/book/types.ts';
import { useUser } from '@/ui/profile/hooks/useUser.tsx';

export const Book: FC = () => {
  const { user } = useUser();
  const isPending = useBookStore().bookLoading;
  const book = useBookStore().book;
  const addBookToCollection = useBookStore().addToCollection;
  const removeFromCollection = useBookStore().removeFromCollection;

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>No data</div>;
  }

  const handleStatusChange = (status: string = '') => {
    if (!user) {
      return;
    }

    if (status === 'reset') {
      removeFromCollection({
        userId: user.uid,
        bookId: book.id,
      });
    } else {
      addBookToCollection({
        userId: user.uid,
        bookId: book.id,
        status: status as TBookStatus,
      });
    }
  };

  const title = book.title || 'Book';

  return (
    <PageWrapper title={title} className={css.pageWrapper}>
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
      <Card>
        <CardContent>
          <div>
            <Select
              onValueChange={handleStatusChange}
              defaultValue={book?.status}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="reading">Reading</SelectItem>
                <SelectItem value="want-to-read">Want to read</SelectItem>
                <SelectItem value="reset">Reset</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  );
};
