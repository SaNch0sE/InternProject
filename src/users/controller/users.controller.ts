import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async getUsers(@Res() res) {
        const books = await this.usersService.getUsers();
        return res.status(HttpStatus.OK).json(books);
    }
}
