import { GoogleBook } from '@/ui/pages/book/decorators/GoogleBook.decorator.ts';
import { GoogleBookItems } from '@/ui/pages/book/decorators/GoogleBooks.decorator.ts';
import {
  TAddFavorite,
  TBooksService,
  TGoogleBookSearchParams,
} from '@/data/books/services/types.ts';
import { IBook } from '@/data/books/enitites/book/types.ts';
import { TBooksRepository } from '@/data/books/repository/types.ts';

const defaultPage = 1;
const defaultLimit = 10;

export class BooksService implements TBooksService {
  constructor(private repository: TBooksRepository) {}

  async searchBooks(
    params: TGoogleBookSearchParams = {
      page: defaultPage,
      limit: defaultLimit,
      query: '',
    },
  ) {
    const { limit = defaultLimit, page = defaultPage } = params;

    const data = await this.repository.fetchBooks(params);

    return new GoogleBookItems(data, limit, page);
  }

  async fetchBookById(bookId: string, userId?: number): Promise<IBook> {
    const data = await this.repository.fetchBookById(bookId);

    const book = new GoogleBook(data);

    if (userId) {
      const bookData = await this.repository.fetchFavoriteBookData(
        userId,
        bookId,
      );

      book.isFavorite = Boolean(bookData);
    }

    return book;
  }

  async addToFavorite(params: TAddFavorite): Promise<void> {
    await this.repository.addToFavorite(params);
  }

  async removeFromFavorite(params: TAddFavorite): Promise<void> {
    await this.repository.removeFromFavorite(params);
  }

  async fetchFavoriteBooks(userId: number): Promise<IBook[]> {
    const bookIds = await this.repository.getFavoriteBooksData(userId);

    return Promise.all(
      bookIds.map((book_provider_id) =>
        this.fetchBookById(book_provider_id, userId),
      ),
    );
  }
}
