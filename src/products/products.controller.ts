import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PrivateService, Role } from 'src/common/decorators/permision.decorator';

@ApiTags('products') // Agrupar rutas en Swagger
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiBody({ type: CreateProductDto }) // Documentar el cuerpo de la solicitud
  @ApiResponse({
    status: 201,
    description: 'Producto creado con éxito.',
    type: CreateProductDto, // El tipo de respuesta esperado
    example: {
      example: {
        value: {
          name: 'Product 1',
          price: 100,
          description: 'Este es un producto de ejemplo',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @PrivateService()
  @Role(['admin'])
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida con éxito.',
    type: [CreateProductDto], // Especifica que es un array de productos
    example: {
      example: {
        value: [
          {
            name: 'Product 1',
            price: 100,
            description: 'Este es un producto de ejemplo',
          },
          {
            name: 'Product 2',
            price: 200,
            description: 'Otro producto de ejemplo',
          },
        ],
      },
    },
  })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiParam({ name: 'id', description: 'ID del producto', example: '1' })
  @ApiResponse({
    status: 200,
    description: 'Producto obtenido con éxito.',
    type: CreateProductDto,
    example: {
      example: {
        value: {
          name: 'Product 1',
          price: 100,
          description: 'Este es un producto de ejemplo',
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar un producto por ID' })
  @ApiParam({ name: 'id', description: 'ID del producto', example: '1' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado con éxito.',
    type: UpdateProductDto,
    example: {
      example: {
        value: {
          name: 'Product actualizado',
          price: 150,
          description: 'Producto actualizado con éxito',
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  @ApiParam({ name: 'id', description: 'ID del producto', example: '1' })
  @ApiResponse({
    status: 200,
    description: 'Producto eliminado con éxito.',
    example: {
      example: {
        value: {
          message: 'Producto eliminado con éxito',
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
