import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Books } from '../books.entity';
import { BookDto } from '../dto/books.dto';

@Injectable()
export class BooksService {
    constructor(@InjectRepository(Books) private readonly booksModel: Repository<Books>) { }

    getBooks(): Promise<Books[]> {
        return this.booksModel.find();
    }

    create(book: BookDto): Promise<Books> {
        return this.booksModel.save(book);
    }
}
