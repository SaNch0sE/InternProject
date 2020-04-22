import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { BooksService } from '../services/books.service';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Get()
    async getPosts(@Res() res) {
        const books = await this.booksService.getBooks();
        return res.status(HttpStatus.OK).json(books);
    }
}
