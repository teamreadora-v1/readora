import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GoogleBooksProvider {
  constructor(private readonly httpService: HttpService) {}

  async searchBooks(query: string) {
    const url =
      `https://www.googleapis.com/books/v1/volumes` +
      `?q=${encodeURIComponent(query)}` +
      `&maxResults=20` +
      `&key=${process.env.GOOGLE_BOOKS_API_KEY}`;

    const response = await firstValueFrom(this.httpService.get(url));
    console.log('response', response.data);
    return response.data;
  }
}
