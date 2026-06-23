import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>) {
    }


    async findUserByEmail(email: string): Promise<User | null> {
        return this.userRepo.findOne({
            where: { email }
        })
    }

    async createUser(value: Partial<User>): Promise<User> {
        const temp = this.userRepo.create(value);
        return this.userRepo.save(temp);
    }


}
