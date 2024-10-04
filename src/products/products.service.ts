import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return this.productRepository.save(createProductDto);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      return await this.productRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.productRepository.findOneBy({ id });
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return this.productRepository.update(id, updateProductDto);
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    try {
      return this.productRepository.delete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
