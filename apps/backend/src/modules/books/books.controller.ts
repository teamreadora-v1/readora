/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Query } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {

    constructor(private readonly booksService: BooksService) {}

    @Get('search')
    search(
        @Query('query') query: string
    ){
        return this.booksService.searchBooks(query);
    }


}
