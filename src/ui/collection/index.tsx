import { FC } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { useBookStore } from '@/stores/books/useBookStore.tsx';
import { Link } from 'react-router-dom';

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
          return (
            <div key={book.id}>
              <div>title: {book.title}</div>
              <div>status: {book.status}</div>
              <Link to={book.id}>open book info</Link>
              <br />
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
};

export default Collection;
