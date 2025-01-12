import { create } from 'zustand/index';
import { TAddToCollection } from '@/data/books/services/types.ts';
import { BooksService } from '@/data/books/services/BooksService.ts';
import { BooksActions, BooksState } from '@/stores/books/types.ts';

const initialState: BooksState = {
  bookLoading: false,
  listLoading: false,
  collectionLoading: false,
  list: null,
  book: null,
  collection: null,
};

export const useBookStore = create<BooksState & BooksActions>((set) => ({
  ...initialState,

  resetBook: () => set({ book: null }),
  resetList: () => set({ list: null }),
  resetAll: () => set(initialState),

  fetchFirstList: async (params) => {
    set(() => ({ listLoading: true }));

    try {
      const books = await BooksService.searchBooks(params);

      set({ list: books });
    } finally {
      set({ listLoading: false });
    }
  },

  fetchPaginatedList: async (params) => {
    set(() => ({ listLoading: true }));

    try {
      const books = await BooksService.searchBooks(params);

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
      const book = await BooksService.getBook({ bookId, userId });

      set({ book });
    } finally {
      set({ bookLoading: false });
    }
  },

  addToCollection: async (params: TAddToCollection) => {
    set(() => ({ bookLoading: true }));

    try {
      await BooksService.addToCollection(params);

      set((state) => {
        if (!state.book) {
          return state;
        }

        return { ...state, book: { ...state.book, status: params.status } };
      });
    } finally {
      set({ bookLoading: false });
    }
  },

  removeFromCollection: async (params) => {
    set(() => ({ bookLoading: true }));

    try {
      await BooksService.removeFromCollection(params);

      set((state) => {
        if (!state.book) {
          return state;
        }

        return { ...state, book: { ...state.book, status: undefined } };
      });
    } finally {
      set({ bookLoading: false });
    }
  },

  //TODO вынести в отдельную стори
  fetchUserCollection: async (userId) => {
    set(() => ({ collectionLoading: true }));

    try {
      const collection = await BooksService.getUserCollection(userId);

      set({ collection });
    } finally {
      set({ collectionLoading: false });
    }
  },

  fetchUserBooksByStatus: async (userId, status) => {
    set(() => ({ collectionLoading: true }));

    try {
      const collection = await BooksService.getUserBooksByStatus(
        userId,
        status,
      );

      set({ collection });
    } finally {
      set({ collectionLoading: false });
    }
  },
}));
