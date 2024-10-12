export interface IBook {
  id: string;
  title: string;
  authors: string[];
  publisher?: string;
  description?: string;
  publishedDate?: string;
  cover?: string;
  categories?: string[];
  language?: string;
  pageCount?: number;
}
