import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.userRepository.save(createUserDto);
    } catch (error) {
      console.log(error);
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });
      if (user && user.password === password) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.userRepository.findOneBy({ email });
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
