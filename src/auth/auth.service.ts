import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  private readonly jwtSecret = 'your_jwt_secret';
  private readonly domain = 'dev-abklmtby8ai4wr78.us.auth0.com';

  constructor(private readonly usersService: UsersService) {}

  async loginWithCredentials(credentials: { email: string; password: string }) {
    const user = await this.usersService.validateUser(credentials.email, credentials.password);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return this.generateJwt(user);
  }

  async registerWithCredentials(registerDto: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const newUser = await this.usersService.create(registerDto);
    return this.generateJwt(newUser);
  }

  getAuthUrl(provider: string) {
    const redirectUri = 'http://localhost:3000/auth/callback';
    return `https://${this.domain}/authorize?response_type=code&client_id=mjWRLXjoE3Z0CWGblhj4OlT7m70SKp3i&redirect_uri=${redirectUri}&connection=${provider}`;
  }

  async handleCallback(query: any) {
    const token = await this.exchangeCodeForToken(query.code);
    const user = await this.getUserInfo(token);
    return user;
  }

  private async exchangeCodeForToken(code: string) {
    const redirectUri = 'http://localhost:3000/auth/callback';
    const response = await axios.post(`https://${this.domain}/oauth/token`, {
      client_id: 'mjWRLXjoE3Z0CWGblhj4OlT7m70SKp3i',
      client_secret: 'jUWZhaijaPYCfnyyQu4sZGDJCOfl8EISiqcZrKonAMfEivEAZbN328iw8jFgvICI',
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    });

    return response.data.access_token;
  }

  private async getUserInfo(token: string) {
    const response = await axios.get(`https://${this.domain}/userinfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  private generateJwt(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' }),
    };
  }
}
