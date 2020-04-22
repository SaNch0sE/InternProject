import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private readonly usersModel: Repository<Users>) { }

    async getUsers(): Promise<Users[]> {
        const users = await this.usersModel.find();
        return users;
    }
}
