import { BooksService } from './books.service';
import { BooksController } from './books.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { GoogleBooksProvider } from './providers/google-books.provider';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [BooksController],
  providers: [BooksService, GoogleBooksProvider],
})
export class BooksModule {}
