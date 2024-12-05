import { FC } from 'react';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { useBookStore } from '@/stores/books/useBookStore.tsx';
import { Link } from 'react-router-dom';
import { BookItem } from '@/ui/pages/book/pages/Search/components/BookItem';

const Collection: FC = () => {
  const collection = useBookStore().collection;
  const loading = useBookStore().collectionLoading;

  if (loading) {
    return <PageWrapper>Loading...</PageWrapper>;
  }

  if (!collection) {
    return <PageWrapper>You don't have a collection</PageWrapper>;
  }

  return (
    <PageWrapper>
      <div>My collection</div>

      <br />

      <div>
        {collection.map((book) => {
          return <BookItem key={book.id} book={book} />;
        })}
      </div>
    </PageWrapper>
  );
};

export default Collection;
