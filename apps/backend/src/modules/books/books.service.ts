/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { GoogleBooksProvider } from './providers/google-books.provider';

@Injectable()
export class BooksService {
  constructor(private readonly googleBooksProvider: GoogleBooksProvider) {}

  async searchBooks(query: string) {
    const response = await this.googleBooksProvider.searchBooks(query);

    const items = response.items.map((book) => {
      const volumeInfo = book.volumeInfo || {};

      return {
        id: book.id,
        title: volumeInfo.title,
        authors: volumeInfo.authors || [],
        thumbnail: volumeInfo.imageLinks?.thumbnail,
        publishedDate: volumeInfo.publishedDate,
        categories: volumeInfo.categories || [],
        rating: volumeInfo.averageRating || null,
      };
    });

    //this.logger.debug(`Returning ${items.length} books for query: ${query}`);

    return {
      totalItems: response.totalItems,
      items,
    };
  }
}
