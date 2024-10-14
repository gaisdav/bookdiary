import { FormEventHandler } from 'react';
import { BookItem } from '@/modules/book/pages/Search/components/BookItem';
import { useBooks } from '@/modules/book/hooks/useBooks.tsx';

const BOOK_TITLE_FIELD = 'bookTitle';

function Search() {
  const { search, isPending, data } = useBooks();

  const searchBook: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const bookTitle = formData.get(BOOK_TITLE_FIELD) as string;
    await search(bookTitle);
  };

  return (
    <>
      <div>
        <form onSubmit={searchBook}>
          <input
            type="text"
            placeholder="book title"
            name={BOOK_TITLE_FIELD}
            required
          />
          <button type="submit">search</button>
        </form>
      </div>
      <div>
        {isPending
          ? 'Loading...'
          : data?.items.map((book) => <BookItem key={book.id} book={book} />)}
      </div>
    </>
  );
}

export default Search;
