import { FormEventHandler, UIEventHandler, useRef } from 'react';
import { BookItem } from '@/modules/book/pages/Search/components/BookItem';
import { useBooks } from '@/modules/book/hooks/useBooks.tsx';
import css from './styles.module.scss';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { PageWrapper } from '@/components/PageWrapper';

const BOOK_TITLE_FIELD = 'bookTitle';

function Search() {
  const formRef = useRef<HTMLFormElement>(null);
  const { search, isLoading, data, error } = useBooks();

  const searchBook: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const bookTitle = formData.get(BOOK_TITLE_FIELD) as string;
    search({ query: bookTitle });
  };

  const handleScroll: UIEventHandler<HTMLDivElement> = async (event) => {
    const target = event.target as HTMLDivElement;
    const isScrollAtBottom =
      Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <
      1;
    if (isScrollAtBottom && data?.items?.length) {
      if (!formRef.current) {
        return;
      }

      const formData = new FormData(formRef.current);
      const bookTitle = formData.get(BOOK_TITLE_FIELD) as string;
      search({
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
          type="search"
          placeholder="Book title"
          name={BOOK_TITLE_FIELD}
          required
        />
        <Button variant="outline" type="submit">
          Search
        </Button>
      </form>

      {error && <div className={css.error}>{error.message}</div>}

      <div>
        {isLoading
          ? 'Loading...'
          : Array.isArray(data?.items)
            ? data?.items.length > 0
              ? data?.items.map((book) => (
                  <BookItem key={book.id} book={book} />
                ))
              : 'No data'
            : 'Type something to search'}
      </div>
    </PageWrapper>
  );
}

export default Search;
