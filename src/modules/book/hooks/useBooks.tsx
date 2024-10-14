import { useMutation } from '@tanstack/react-query';
import { TGoogleBookSearch } from '@/modules/book/hooks/types.ts';
import { GoogleBookItems } from '@/modules/book/decorators/GoogleBooks.decorator.ts';

export const useBooks = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: async (query: string) => {
      const result = await fetch(
        //TODO вынести в endpoints
        // add pagination
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${import.meta.env.BOOK_GOOGLE_API_KEY}`,
      );

      const data = (await result.json()) as TGoogleBookSearch;

      return new GoogleBookItems(data);
    },
  });

  return { search: mutate, ...rest };
};
