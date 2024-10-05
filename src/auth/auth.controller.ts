import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    return this.authService.loginWithCredentials(credentials);
  }

  @Post('register')
  async register(@Body() registerDto: CreateUserDto) {
    return this.authService.registerWithCredentials(registerDto);
  }

  @Get('login/social')
  async loginWithSocial(@Query('provider') provider: string) {
    const redirectUrl = this.authService.getAuthUrl(provider);
    return { redirect: redirectUrl };
  }

  @Get('callback')
  async callback(@Query() query: any) {
    const user = await this.authService.handleCallback(query);
    return { user };
  }
}
