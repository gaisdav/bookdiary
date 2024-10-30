import { FC } from 'react';
import { useBook } from '@/modules/book/hooks/useBook.tsx';
import { PageWrapper } from '@/components/PageWrapper';

export const Book: FC = () => {
  const { isPending, error, data: book } = useBook();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error?.message}</div>;
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
