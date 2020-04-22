import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Books } from '../books.entity';
import { Helper } from './books.helper';
import { IResponse } from '../interfaces/books.response';

@Injectable()
export class BooksService {
    constructor(@InjectRepository(Books) private readonly booksModel: Repository<Books>) { }

    async getBooks(): Promise<IResponse[]> {
        const books: Books[] = await this.booksModel.find({ select: ["code3"] });
        return new Helper(books).getBooks();
    }
}
