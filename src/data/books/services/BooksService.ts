import { GoogleBookItems } from '@/ui/book/decorators/GoogleBooks.decorator.ts';
import {
  constructGoogleBooksUrl,
  constructGoogleBookUrl,
} from '@/data/books/services/utils.ts';
import { TGoogleBookSearchParams } from '@/data/books/services/types.ts';
import { GoogleBook } from '@/ui/book/decorators/GoogleBook.decorator.ts';
import { TGoogleBook } from '@/stores/books/types.ts';

const defaultPage = 1;
const defaultLimit = 10;

export class BooksService {
  static async getBooks(
    params: TGoogleBookSearchParams = {
      page: defaultPage,
      limit: defaultLimit,
      query: '',
    },
  ) {
    const { query = '', limit = defaultLimit, page = defaultPage } = params;
    const url = constructGoogleBooksUrl(query, limit, page);

    const result = await fetch(url.toString());
    const data = await result.json();
    return new GoogleBookItems(data, limit, page);
  }

  static async getBook(bookId: string) {
    const url = constructGoogleBookUrl(bookId);
    const result = await fetch(url);
    const data = (await result.json()) as TGoogleBook;

    return new GoogleBook(data);
  }
}
