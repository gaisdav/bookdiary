import { FC } from 'react';
import { useBookStore } from '@/data/books/store/useBookStore.tsx';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { PageType, TMyBooksPage } from '@/ui/pages/books/types.ts';
import { BookCardItem } from '@/ui/components/BookCardItem';

const header: Record<TMyBooksPage, string> = {
  'my-books': 'My books',
  'want-to-read': 'Want to read',
  favorites: 'Favorites',
};

export const Books: FC<PageType> = ({ type }) => {
  const collection = useBookStore().collection;
  const favoriteBooks = useBookStore().favoriteBooks;
  const favoriteLoading = useBookStore().favoriteLoading;
  const loading = useBookStore().collectionLoading;

  let list = collection;

  if (type === 'favorites') {
    list = favoriteBooks;
  }

  if (loading || favoriteLoading) {
    return <PageWrapper title={header[type]}>Loading...</PageWrapper>;
  }

  return (
    <PageWrapper showBack showSearch title={header[type]}>
      <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-1">
        {[...list.values()].map((book) => (
          <BookCardItem key={book.id} book={book} />
        ))}
      </div>
    </PageWrapper>
  );
};
