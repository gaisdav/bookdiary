import { create } from 'zustand/index';
import { IBook } from '@/enitites/book/types.ts';
import { TGoogleBookSearchParams } from '@/modules/book/api/types.ts';
import { BooksApi } from '@/modules/book/api/BooksApi.ts';
import { IBookList } from '@/modules/book/stores/types.ts';

interface BooksState {
  listLoading: boolean;
  bookLoading: boolean;
  list: IBookList | null;
  book: IBook | null;
}

interface BooksActions {
  resetBook: () => void;
  resetList: () => void;
  resetAll: () => void;
  fetchPaginatedList: (params: TGoogleBookSearchParams) => void;
  fetchFirstList: (params: TGoogleBookSearchParams) => void;
  fetchBook: (params: { bookId: string }) => void;
}

const initialState: BooksState = {
  bookLoading: false,
  listLoading: false,
  list: null,
  book: null,
};

export const useBookStore = create<BooksState & BooksActions>((set) => ({
  ...initialState,

  resetBook: () => set({ book: null }),
  resetList: () => set({ list: null }),
  resetAll: () => set(initialState),

  fetchFirstList: async (params) => {
    set(() => ({ listLoading: true }));

    try {
      const books = await BooksApi.getBooks(params);

      set({ list: books });
    } finally {
      set({ listLoading: false });
    }
  },

  fetchPaginatedList: async (params) => {
    set(() => ({ listLoading: true }));

    try {
      const books = await BooksApi.getBooks(params);

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

  fetchBook: async ({ bookId }) => {
    set(() => ({ bookLoading: true }));
    try {
      const book = await BooksApi.getBook(bookId);

      set({ book });
    } finally {
      set({ bookLoading: false });
    }
  },
}));
