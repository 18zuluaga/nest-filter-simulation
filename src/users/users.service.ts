import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { mercadoPagoApi } from 'src/common/config/axios.xonfig';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.save(createUserDto);

      // Solo enviar el email como parte de la solicitud
      const usermercado = await mercadoPagoApi.post('/customers', {
        email: createUserDto.email,
      });
      console.log(usermercado);
      return user;
    } catch (error) {
      console.error(error); // Para obtener más información sobre el error
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });
      if (user && user.password === password) {
        delete user.password;
        return user;
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

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.log(error);
    }
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
