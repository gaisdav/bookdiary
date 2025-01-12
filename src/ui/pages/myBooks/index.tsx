import { FC } from 'react';
import { useBookStore } from '@/stores/books/useBookStore.tsx';
import { BookItem } from '@/ui/components/BookItem';
import { H3 } from '@/ui/components/ui/typography.tsx';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { PageType } from '@/ui/pages/myBooks/types.ts';
import { TBookStatus } from '@/data/books/enitites/book/types.ts';

const header: Record<TBookStatus, string> = {
  read: 'Read',
  reading: 'Reading',
  'want-to-read': 'To read',
};

export const MyBooks: FC<PageType> = ({ type }) => {
  const collection = useBookStore().collection;
  const loading = useBookStore().collectionLoading;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PageWrapper>
      <H3>{header[type]}</H3>

      <div className="mt-4">
        {collection?.map((book) => <BookItem key={book.id} book={book} />)}
      </div>
    </PageWrapper>
  );
};
