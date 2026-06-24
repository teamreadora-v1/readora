import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(value: RegisterUserDto) {
    const existingUser = await this.userService.findUserByEmail(value.email);

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(value.password, 10);

    const newUser = await this.userService.createUser({
      email: value.email,
      passwordHash,
      firstName: value.firstName,
      lastName: value.lastName,
    });

    return {
      message: 'User registered successfully',
      userId: newUser.id,
    };
  }

  async login(userDetails: LoginUserDto) {
    const user = await this.userService.findUserByEmail(userDetails.email);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      userDetails.password,
      user.passwordHash,
    );

    const jwtToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      message: 'User Logged in successfully',
      token: jwtToken,
    };
  }
}
