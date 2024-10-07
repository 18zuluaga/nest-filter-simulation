import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {

  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async login(user: Partial<User>) {
    try {
      const userDB = await this.usersService.findByEmail(user.email);
      if (userDB && (await bcrypt.compare(user.password, userDB.password))) {
        const payload = { email: userDB.email, id: userDB.id, role: 'admin'};
        const token = this.jwtService.sign(payload);
        return { token };
      }
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    } catch (error) {
      console.log(error);
    }
  }

  async register(user: CreateUserDto) {
    try {
      console.log(user);
      const userDB = await this.usersService.findByEmail(user.email);
      if (userDB) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
      }
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = await this.usersService.create({ ...user, password: hashedPassword });
      console.log(newUser);
      const payload = { email: newUser.email, id: newUser.id, role: newUser.role };
      const token = this.jwtService.sign(payload);
      console.log(token);
      return { token };
    } catch (error) {
      console.log(error);
    }
  }
}
