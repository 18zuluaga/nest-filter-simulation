import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    try {
      return await this.transactionRepository.save(createTransactionDto); 
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      return await this.transactionRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.transactionRepository.findOneBy({ id });
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    try {
      return await this.transactionRepository.update(id, updateTransactionDto);
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    try {
      return this.transactionRepository.delete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
