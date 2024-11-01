import { FC } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { useBookStore } from '@/modules/book/stores/useBookStore.tsx';

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
      {book.cover && (
        <img
          loading={'lazy'}
          src={book.cover}
          alt={`${book.title} ${book.authors.join(', ')}`}
        />
      )}
      <div>{book.title}</div>
      <div>{book.subtitle}</div>
      <div>{book.authors}</div>
      <div>{book.description}</div>
      <div>{book.categories}</div>
      <div>{book.language}</div>
      <div>{book.pageCount}</div>
      <div>{book.publishedDate}</div>
    </PageWrapper>
  );
};
