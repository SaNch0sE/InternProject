import { Controller, Get, Post, Body } from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { BookDto } from '../dto/books.dto';
import { Books } from '../books.entity';

@Controller()
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Get('books')
    async getPosts() {
        return await this.booksService.getBooks();
    }
    
    @Post('api/books')
    async create(@Body() bookDto: BookDto): Promise<Books> {
        return await this.booksService.create(bookDto);
    }
}
