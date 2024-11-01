import { GoogleBookItems } from '@/modules/book/decorators/GoogleBooks.decorator.ts';
import {
  constructGoogleBooksUrl,
  constructGoogleBookUrl,
} from '@/modules/book/api/utils.ts';
import { TGoogleBookSearchParams } from '@/modules/book/api/types.ts';
import { GoogleBook } from '@/modules/book/decorators/GoogleBook.decorator.ts';
import { TGoogleBook } from '@/modules/book/stores/types.ts';

const defaultPage = 1;
const defaultLimit = 10;

export class BooksApi {
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
