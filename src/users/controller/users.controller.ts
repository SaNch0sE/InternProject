import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto } from '../dto/users.dto';
import { Users } from '../users.entity';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('users')
    async getUsers(): Promise<Users[]> {
        return await this.usersService.getUsers();
    }

    @Post('api/users')
    async create(@Body() userDto: UserDto): Promise<Users> {
        return await this.usersService.create(userDto);
    }
}
