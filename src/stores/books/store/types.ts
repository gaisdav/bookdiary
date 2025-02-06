import { IBook, TBookStatus } from '@/stores/books/enitites/book/types.ts';
import {
  TAddToCollection,
  TGoogleBookSearchParams,
} from '@/stores/books/services/types.ts';

export type TGoogleBook = {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    language: string;
    industryIdentifiers: {
      type: string;
      identifier: string;
    }[];
    readingModes: {
      text: boolean;
      image: boolean;
    };
    pageCount: number;
    printType: string;
    categories: string[];
    averageRating: number;
    ratingsCount: number;
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: {
      containsEpubBubbles: boolean;
      containsImageBubbles: boolean;
    };
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
  };
};

export interface IBookList {
  totalItems: number;
  items: IBook[];
  limit: number;
  page: number;
}

export type TGoogleBookSearch = {
  totalItems: number;
  items: TGoogleBook[];
};

export interface BooksState {
  listLoading: boolean;
  bookLoading: boolean;
  collectionLoading: boolean;
  list: IBookList | null;
  book: IBook | null;
  collection: IBook[] | null;
}

export interface BooksActions {
  resetBook: () => void;
  resetList: () => void;
  resetAll: () => void;
  fetchPaginatedList: (params: TGoogleBookSearchParams) => void;
  fetchFirstList: (params: TGoogleBookSearchParams) => void;
  fetchBook: (params: Omit<TAddToCollection, 'status'>) => void;
  addToCollection: (params: TAddToCollection) => void;
  removeFromCollection: (params: Omit<TAddToCollection, 'status'>) => void;
  fetchUserCollection: (userId: string) => void;
  fetchUserBooksByStatus: (userId: string, status: TBookStatus) => void;
}
