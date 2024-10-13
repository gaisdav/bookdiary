import { useBooksController } from '@/сontrollers/book/useBooksController';
import { FormEventHandler } from 'react';

const BOOK_TITLE_FIELD = 'bookTitle';

function Library() {
  const { bookList, searching, searchBook } = useBooksController();

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
              <div key={book.id}>
                <br />
                {book.cover && (
                  <img
                    loading={'lazy'}
                    src={book.cover}
                    alt={`${book.title} ${book.authors.join(', ')}`}
                  />
                )}
                <div>{book.title}</div>
                <div>{book.authors}</div>
                <div>{book.categories}</div>
                <div>{book.description}</div>
                <div>{book.language}</div>
                <div>{book.pageCount}</div>
                <div>{book.publishedDate}</div>
                <br />
                <hr />
              </div>
            ))}
      </div>
    </>
  );
}

export default Library;
