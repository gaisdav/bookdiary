import { GoogleBook } from '@/ui/pages/book/decorators/GoogleBook.decorator.ts';
import { GoogleBookItems } from '@/ui/pages/book/decorators/GoogleBooks.decorator.ts';
import {
  TUserIdBookId,
  TBooksService,
  TChangeStatus,
  TGoogleBookSearchParams,
  TUserIdStatuses,
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

  async fetchBookById(params: TUserIdBookId): Promise<IBook> {
    const data = await this.repository.fetchBookById(params.bookId);

    const book = new GoogleBook(data);

    if (params.userId) {
      const [favoriteData, bookStatus] = await Promise.all([
        await this.repository.fetchFavoriteBookData(params),
        await this.repository.fetchBookStatus(params),
      ]);

      book.isFavorite = Boolean(favoriteData);
      book.status = bookStatus;
    }

    return book;
  }

  async fetchBooksByStatuses(params: TUserIdStatuses): Promise<IBook[]> {
    const bookIds = await this.repository.fetchBooksDataByStatuses(params);

    return Promise.all(
      bookIds.map((book_provider_id) =>
        this.fetchBookById({
          bookId: book_provider_id,
          userId: params.userId,
        }),
      ),
    );
  }

  async addToFavorite(params: TUserIdBookId): Promise<void> {
    await this.repository.addToFavorite(params);
  }

  async removeFromFavorite(params: TUserIdBookId): Promise<void> {
    await this.repository.removeFromFavorite(params);
  }

  async fetchFavoriteBooks(userId: number): Promise<IBook[]> {
    const bookIds = await this.repository.getFavoriteBooksData(userId);

    return Promise.all(
      bookIds.map((book_provider_id) =>
        this.fetchBookById({ bookId: book_provider_id, userId }),
      ),
    );
  }

  async changeBookStatus(params: TChangeStatus): Promise<void> {
    await this.repository.changeBookStatus(params);
  }

  async resetBookStatus(params: TUserIdBookId): Promise<void> {
    await this.repository.resetBookStatus(params);
  }
}
