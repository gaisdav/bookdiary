import { IBook } from '@/enitites/book/types.ts';
import { TGoogleBook } from '../hooks/types.ts';
import { BookEntity } from '@/enitites/book/BookEntity.ts';

export class GoogleBook extends BookEntity implements IBook {
  constructor(info: TGoogleBook) {
    super({
      id: info.id,
      title: info.volumeInfo.title || '',
      subtitle: info.volumeInfo.subtitle || '',
      authors: info.volumeInfo.authors || [],
      publisher: info.volumeInfo.publisher || '',
      description: info.volumeInfo.description || '',
      publishedDate: info.volumeInfo.publishedDate,
      cover: info.volumeInfo.imageLinks?.thumbnail,
      categories: info.volumeInfo.categories || [],
      language: info.volumeInfo.language,
      pageCount: info.volumeInfo.pageCount,
    });
  }
}
