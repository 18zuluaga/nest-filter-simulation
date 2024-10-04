import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(token: string): Promise<any> {
    const user = this.jwtService.verify(token, {
      secret: process.env.AUTH0_CLIENT_SECRET,
    });
    return user;
  }
}
