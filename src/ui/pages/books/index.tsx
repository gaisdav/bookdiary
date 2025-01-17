import { FC } from 'react';
import { useBookStore } from '@/stores/books/useBookStore.tsx';
import { H3 } from '@/ui/components/ui/typography.tsx';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { PageType } from '@/ui/pages/books/types.ts';
import { TBookStatus } from '@/data/books/enitites/book/types.ts';
import { BookCardItem } from '@/ui/components/BookCardItem';

const header: Record<TBookStatus, string> = {
  read: 'Read',
  reading: 'Reading',
  'want-to-read': 'To read',
};

export const Books: FC<PageType> = ({ type }) => {
  const collection = useBookStore().collection;
  const loading = useBookStore().collectionLoading;

  if (loading) {
    return <PageWrapper title="Loading">Loading...</PageWrapper>;
  }

  return (
    <PageWrapper showBack showSearch title={header[type]}>
      <H3>{header[type]}</H3>

      <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-1">
        {collection?.map((book) => <BookCardItem key={book.id} book={book} />)}
      </div>
    </PageWrapper>
  );
};
