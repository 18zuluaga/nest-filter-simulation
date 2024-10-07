import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  import { ConfigService } from '@nestjs/config';
  import { Reflector } from '@nestjs/core';
import { User } from 'src/users/entities/user.entity';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private configService: ConfigService,
      private reflector: Reflector
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
  
      if (!token) {
        throw new UnauthorizedException('Token is not found');
      }
  
      try {
        const payload: Partial<User> = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get<string>('JWT_SECRET'),
        });
        let role = this.reflector.get<string[]>('role', context.getHandler());
  
        if (role !== undefined && !role.includes(payload.role)) {
          throw new UnauthorizedException(
            `The role '${payload.role}' does not have permissions of (${role}).`
          );
        }
  
        request['user'] = payload;
      } catch (error) {
        console.log(error);
        throw new UnauthorizedException(error.message);
      }
  
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }