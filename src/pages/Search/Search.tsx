import { useBooksController } from '@/сontrollers/book/useBooksController';
import { FormEventHandler } from 'react';
import { BookItem } from '@/pages/Search/components/BookItem';

const BOOK_TITLE_FIELD = 'bookTitle';

function Search() {
  const { bookList, searching, searchBook, getBook } = useBooksController();

  const search: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const bookTitle = formData.get(BOOK_TITLE_FIELD) as string;
    await searchBook(bookTitle);
  };

  return (
    <>
      <div>
        <form onSubmit={search}>
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
        {searching
          ? 'Loading...'
          : bookList?.items.map((book) => (
              <BookItem key={book.id} book={book} openBook={getBook} />
            ))}
      </div>
    </>
  );
}

export default Search;
