import { IBook } from '../../enitites/book/types.ts';
import { TBookList, TGoogleBookSearch } from './types.ts';
import { BookEntity } from '../../enitites/book/BookEntity.ts';

export class GoogleBookItems implements TBookList {
  totalItems: number = 0;
  items: IBook[] = [];

  constructor(info: { totalItems: number } & TGoogleBookSearch) {
    this.totalItems = info.totalItems;
    this.items =
      info.items?.map(
        (book) =>
          new BookEntity({
            id: book.id,
            publishedDate: book.volumeInfo.publishedDate,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            categories: book.volumeInfo.categories,
            cover: book.volumeInfo.imageLinks?.thumbnail,
            description: book.volumeInfo.description,
            language: book.volumeInfo.language,
            pageCount: book.volumeInfo.pageCount,
            publisher: book.volumeInfo.publisher,
          }),
      ) || [];
  }
}
