import { useQuery } from '@tanstack/react-query';
import { TGoogleBook } from '@/modules/book/hooks/types.ts';
import { GoogleBook } from '@/modules/book/decorators/GoogleBook.decorator.ts';
import { useParams } from 'react-router-dom';

export const useBook = () => {
  const { bookId } = useParams();

  return useQuery({
    queryKey: [bookId],
    queryFn: async () => {
      const result = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${import.meta.env.BOOK_GOOGLE_API_KEY}`,
      );

      const data = (await result.json()) as TGoogleBook;

      return new GoogleBook(data);
    },
  });
};
