import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  IBookList,
  TGoogleBookSearch,
  TGoogleBookSearchParams,
} from '@/modules/book/hooks/types.ts';
import { GoogleBookItems } from '@/modules/book/decorators/GoogleBooks.decorator.ts';
import { useEffect, useState } from 'react';

const defaultPage = 1;
const defaultLimit = 10;

const constructGoogleBooksUrl = (
  query: string,
  limit: number,
  page: number,
): string => {
  const url = new URL('https://www.googleapis.com/books/v1/volumes');
  url.search = new URLSearchParams({
    key: import.meta.env.BOOK_GOOGLE_API_KEY.toString(),
    q: query,
    maxResults: limit.toString(),
    startIndex: ((page - 1) * limit).toString(),
  }).toString();
  return url.toString();
};

export const useBooks = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(defaultPage);
  const [limit, setLimit] = useState(defaultLimit);
  const [data, setData] = useState<IBookList | null>(null);

  const booksQuery = useQuery<IBookList>({
    queryKey: ['books', query, page, limit],
    placeholderData: keepPreviousData,
    staleTime: 1000,
    enabled: !!query,
    retry: false,
    queryFn: async () => {
      const apiUrl = constructGoogleBooksUrl(query, limit, page);
      const result = await fetch(apiUrl);

      if (!result.ok) {
        const errorData = await result.json();
        throw errorData.error || errorData || new Error('Something went wrong');
      }

      const data = (await result.json()) as TGoogleBookSearch;

      return new GoogleBookItems(data, limit, page);
    },
  });

  const { data: result, ...rest } = booksQuery;

  useEffect(() => {
    if (!result) {
      return;
    }

    setData((prevData) => ({
      ...result,
      items: prevData?.items
        ? [
            ...prevData.items,
            ...(result.items || []).filter(
              (item) =>
                !prevData.items?.some((prevItem) => prevItem.id === item.id),
            ),
          ]
        : result.items,
    }));
  }, [result]);

  const search = ({
    query = '',
    limit = defaultLimit,
    page = defaultPage,
  }: TGoogleBookSearchParams) => {
    setQuery(query);
    setLimit(limit);
    setPage(page);
  };

  return { data, search, setData, ...rest };
};
