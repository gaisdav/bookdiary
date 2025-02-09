import { create } from 'zustand/index';
import { BooksService } from '@/data/books/services/BooksService.ts';
import { BooksActions, BooksState } from '@/data/books/store/types.ts';
import { supabase } from '@/lib/supabase.config.ts';
import { BooksRepository } from '@/data/books/repository/BooksRepository.ts';

const initialState: BooksState = {
  bookLoading: false,
  listLoading: false,
  collectionLoading: false,
  favoriteLoading: false,
  list: null,
  book: null,
  collection: new Map(),
  favoriteBooks: new Map(),
};

const booksRepository = new BooksRepository(supabase);
const bookService = new BooksService(booksRepository);

export const useBookStore = create<BooksState & BooksActions>((set, get) => ({
  ...initialState,

  resetBook: () => set({ book: null }),
  resetList: () => set({ list: null }),
  resetAll: () => set(initialState),

  fetchFirstList: async (params) => {
    set(() => ({ listLoading: true }));

    try {
      const books = await bookService.searchBooks(params);

      set({ list: books });
    } finally {
      set({ listLoading: false });
    }
  },

  fetchPaginatedList: async (params) => {
    set(() => ({ listLoading: true }));

    try {
      const books = await bookService.searchBooks(params);

      set(({ list }) => ({
        list: {
          ...books,
          items: list?.items
            ? [
                ...list.items,
                ...(books.items || []).filter(
                  (item) =>
                    !list.items?.some((prevItem) => prevItem.id === item.id),
                ),
              ]
            : books.items,
        },
      }));
    } finally {
      set({ listLoading: false });
    }
  },

  fetchBook: async ({ bookId, userId }) => {
    set(() => ({ bookLoading: true }));
    try {
      const book = await bookService.fetchBookById(bookId, userId);

      set({ book });
    } finally {
      set({ bookLoading: false });
    }
  },

  addToFavorite: async (params) => {
    set(() => ({ favoriteLoading: true }));

    await bookService.addToFavorite(params);
    const favoriteBook = await bookService.fetchBookById(
      params.bookId,
      params.userId,
    );

    set({
      favoriteLoading: false,
      favoriteBooks: get().favoriteBooks.set(favoriteBook.id, favoriteBook),
    });
  },

  removeFromFavorite: async (params) => {
    set(() => ({ favoriteLoading: true }));

    await bookService.removeFromFavorite(params);

    const favoriteBooks = get().favoriteBooks;
    favoriteBooks.delete(params.bookId);

    set({
      favoriteLoading: false,
      favoriteBooks,
    });
  },

  getFavoriteBooks: async (userId) => {
    set({
      favoriteLoading: true,
    });
    const books = await bookService.fetchFavoriteBooks(userId);

    set({
      favoriteLoading: false,
      favoriteBooks: new Map(books.map((book) => [book.id, book])),
    });
  },
}));
