import { FC } from 'react';
import { useBookStore } from '@/data/books/store/useBookStore.tsx';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { PageType, TMyBooksPage } from '@/ui/pages/books/types.ts';
import { BookCardItem } from '@/ui/components/BookCardItem';
import { ROUTE } from '@/ui/routes/routes.ts';
import { useNavigate } from 'react-router-dom';

const header: Record<TMyBooksPage, string> = {
  'my-books': 'My books',
  'want-to-read': 'Want to read',
  favorites: 'Favorites',
};

const bookRoutes: Record<TMyBooksPage, string> = {
  'my-books': ROUTE.MY_LIBRARY.MY_BOOKS.BOOK,
  'want-to-read': ROUTE.MY_LIBRARY.WANT_TO_READ.BOOK,
  favorites: ROUTE.MY_LIBRARY.FAVORITES.BOOK,
};

export const Books: FC<PageType> = ({ type }) => {
  const collection = useBookStore().collection;
  const favoriteBooks = useBookStore().favoriteBooks;
  const favoriteLoading = useBookStore().favoriteLoading;
  const loading = useBookStore().collectionLoading;

  const navigate = useNavigate();

  let list = collection;

  if (type === 'favorites') {
    list = favoriteBooks;
  }

  if (loading || favoriteLoading) {
    return <PageWrapper title={header[type]}>Loading...</PageWrapper>;
  }

  const goBack = () => {
    navigate(ROUTE.HOME.ROOT);
  };

  return (
    <PageWrapper showBack showSearch title={header[type]} onGoBack={goBack}>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-1">
        {[...list.values()].map((book) => (
          <BookCardItem
            key={book.id}
            book={book}
            bookRoute={bookRoutes[type]}
          />
        ))}
      </div>
    </PageWrapper>
  );
};
