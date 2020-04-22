import { IResponse } from '../interfaces/books.response'
import { Books } from '../interfaces/books.interface'

export class Helper {
    private books: Books[];

    constructor (books: Books[]) {
        this.books = books;
    }

    getBooks() {
        try {
            const books: Books[] = this.books;
            const map: Map<string, number> = new Map();
            books.forEach((el) => {
                const code: string = el.code3;
                if (Number.isNaN(map[code])) {
                    map[code] = 1;
                } else {
                    map[code] += 1;
                }
            });
            const data: IResponse[] = Object.keys(map).map((key) => ({ code3: key, value: map[key] }));
            return data;
        } catch (error) {
            console.error(error);
            return [{ code3: 'Server Error', value: 500}];
        }
    }
}