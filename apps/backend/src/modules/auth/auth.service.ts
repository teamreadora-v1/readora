import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService,) {

    }


    async register(value: RegisterUserDto) {
        const existingUser = await this.userService.findUserByEmail(value.email);

        if (existingUser) {
            throw new BadRequestException('Email already registered');
        }

        const passwordHash = await bcrypt.hash(
            value.password, 10
        )

        const newUser = await this.userService.createUser({
            email: value.email,
            passwordHash,
            firstName: value.firstName,
            lastName: value.lastName,
        })

        return {
            message: 'User registered successfully',
            userId: newUser.id,
        };
    }
}
