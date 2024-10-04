// src/products/dto/create-product.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsPositive } from 'class-validator';

export class CreateProductDto {

  @ApiProperty({ example: 'Product 1'})
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({ example: 'Product description'})
  @IsNotEmpty({ message: 'Description should not be empty' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ApiProperty({ example: 100})
  @IsNotEmpty({ message: 'Price should not be empty' })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;

  @ApiProperty({ example: 10})
  @IsNotEmpty({ message: 'Stock should not be empty' })
  @IsNumber({}, { message: 'Stock must be a number' })
  @IsPositive({ message: 'Stock must be a positive number' })
  stock: number;
}
