import { IBook } from '@/enitites/book/types.ts';

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

export type TBookList = {
  totalItems: number;
  items: IBook[] | null;
  limit: number;
  page: number;
};

export type TGoogleBookSearch = {
  totalItems: number;
  items: TGoogleBook[];
};

export type TGoogleBookSearchParams = {
  query: string;
  page?: number;
  limit?: number;
};
