/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { GoogleBooksProvider } from './providers/google-books.provider';
import { ResponseHelper } from 'src/common/helper/response.helper';
import { Messages } from 'src/common/constants/message.constant';

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

    return ResponseHelper.success(
      {
        totalItems: response.totalItems,
        items,
      },
      Messages.BOOKS.SEARCH_SUCCESS.title,
      Messages.BOOKS.SEARCH_SUCCESS.message,
    );
  }

  async getBookById(bookId: string) {
    const book = await this.googleBooksProvider.getBookById(bookId);

    if (!book) {
      throw new NotFoundException(
        ResponseHelper.error(
          Messages.BOOKS.NOT_FOUND.title,
          Messages.BOOKS.NOT_FOUND.message,
        ),
      );
    }

    const volumeInfo = book.volumeInfo || {};

    const bookDetails = {
      id: book.id,
      title: volumeInfo.title,
      subtitle: volumeInfo.subtitle,
      authors: volumeInfo.authors || [],
      publisher: volumeInfo.publisher,
      publishedDate: volumeInfo.publishedDate,
      description: volumeInfo.description,
      pageCount: volumeInfo.pageCount,
      categories: volumeInfo.categories || [],
      language: volumeInfo.language,
      rating: volumeInfo.averageRating || null,
      ratingsCount: volumeInfo.ratingsCount || 0,
      thumbnail: volumeInfo.imageLinks?.thumbnail,
      smallThumbnail: volumeInfo.imageLinks?.smallThumbnail,
      previewLink: volumeInfo.previewLink,
      infoLink: volumeInfo.infoLink,
    };
    return ResponseHelper.success(
      bookDetails,
      Messages.BOOKS.DETAILS_SUCCESS.title,
      Messages.BOOKS.DETAILS_SUCCESS.message,
    );
  }
}
