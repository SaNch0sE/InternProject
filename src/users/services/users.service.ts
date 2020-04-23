import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/users.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private readonly usersModel: Repository<Users>) { }

    getUsers(): Promise<Users[]> {
        return this.usersModel.find();
    }

    create(user: UserDto): Promise<Users> {
        return this.usersModel.save(user);
    }
}
