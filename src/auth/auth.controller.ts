import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  getProtected(): string {
    return 'This is a protected route';
  }
}
