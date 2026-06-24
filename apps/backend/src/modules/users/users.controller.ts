import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { get } from 'http';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  getCurrentUser(@Req() request: any) {
    console.log('USER =>', request.user);

    return request.user;
  }
  
}
