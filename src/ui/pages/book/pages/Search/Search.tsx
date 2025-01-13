import { FormEventHandler, UIEventHandler, useEffect, useRef } from 'react';
import css from './styles.module.scss';
import { Input } from '@/ui/components/ui/input.tsx';
import { Button } from '@/ui/components/ui/button.tsx';
import { PageWrapper } from '@/ui/components/PageWrapper';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'react-router-dom';
import { useBookStore } from '@/stores/books/useBookStore.tsx';
import { BookListItem } from '@/ui/components/BookListItem';

const BOOK_TITLE_FIELD = 'bookTitle';

function Search() {
  const data = useBookStore((state) => state.list);
  const firstPageIsLoading = useBookStore(
    (state) => state.listLoading && !state.list,
  );
  const otherPagesAreLoading = useBookStore(
    (state) => state.listLoading && state.list,
  );
  const fetchList = useBookStore((state) => state.fetchPaginatedList);
  const [searchParams, setSearchParams] = useSearchParams();

  const formRef = useRef<HTMLFormElement>(null);
  const bookTitleField = useRef<HTMLInputElement>(null);

  const query = searchParams.get('query');

  useEffect(() => {
    if (bookTitleField.current && query) {
      bookTitleField.current.value = query;
    }
  }, [query]);

  const searchBook: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const bookTitle = formData.get(BOOK_TITLE_FIELD) as string;
    setSearchParams({ query: bookTitle });
    // to hide keyboard on mobile
    bookTitleField?.current?.blur();
  };

  const handleScroll: UIEventHandler<HTMLDivElement> = async (event) => {
    const target = event.target as HTMLDivElement;
    const isScrollAtBottom =
      Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <
      1;

    const canLoadMore =
      !otherPagesAreLoading &&
      isScrollAtBottom &&
      formRef.current &&
      data &&
      data.items &&
      data.totalItems > data.items?.length;

    if (canLoadMore) {
      const formData = new FormData(formRef.current || undefined);
      const bookTitle = formData.get(BOOK_TITLE_FIELD) as string;

      if (!bookTitle) {
        return;
      }

      fetchList({
        query: bookTitle,
        limit: data.limit,
        page: data.page + 1,
      });
    }
  };

  return (
    <PageWrapper onScroll={handleScroll} className={css.wrapper}>
      <form className={css.form} onSubmit={searchBook} ref={formRef}>
        <Input
          ref={bookTitleField}
          type="search"
          placeholder="Book title"
          name={BOOK_TITLE_FIELD}
          required
        />
        <Button
          className={css.searchBtn}
          variant="outline"
          type="submit"
          size="icon"
        >
          <MagnifyingGlassIcon />
        </Button>
      </form>

      {/*{error && <div className={css.error}>{error.message}</div>}*/}

      <div className={css.list}>
        {firstPageIsLoading ? (
          'Loading...'
        ) : Array.isArray(data?.items) ? (
          data?.items.length > 0 ? (
            <>
              {data?.items.map((book) => (
                <BookListItem key={book.id} book={book} />
              ))}
              {otherPagesAreLoading && <div>Loading...</div>}
            </>
          ) : (
            'No data'
          )
        ) : (
          'Type something to search'
        )}
      </div>
    </PageWrapper>
  );
}

export default Search;
