import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth0Strategy } from './auth.steategy';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, Auth0Strategy, UsersService],
})
export class AuthModule {}
