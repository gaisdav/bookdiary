import { useBooksController } from "../сontrollerHooks/useBooksController.tsx";
import { useState } from "react";

function Library() {
  const [bookTitleValue, setBookTitleValue] = useState("");
  const { books, createBook, removeBook, getBook, listLoading } =
    useBooksController();

  return (
    <>
      <div className="card">
        <input
          type="text"
          placeholder="book title"
          onChange={(event) => {
            setBookTitleValue(event.target.value);
          }}
        />
        <button onClick={() => createBook({ title: bookTitleValue })}>
          save
        </button>
      </div>
      <div>
        {listLoading
          ? "Loading..."
          : books.map((book) => (
              <div key={book.id}>
                <div>{book.title}</div>
                <button onClick={() => removeBook(book.id)}>delete</button>
                <button
                  onClick={async () => console.log(await getBook(book.id))}
                >
                  read
                </button>
              </div>
            ))}
      </div>
    </>
  );
}

export default Library;
