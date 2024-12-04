import { FC } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { useBookStore } from '@/stores/books/useBookStore.tsx';

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
      <div>Your collection</div>

      <br />

      <div>
        {collection.map((book) => {
          return (
            <div>
              <div key={book.id}>title: {book.title}</div>
              <div>status: {book.status}</div>
              <br />
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
};

export default Collection;
