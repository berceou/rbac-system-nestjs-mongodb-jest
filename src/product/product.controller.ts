import { Product } from 'src/tools/models/product.model';
import {
  Controller,
  Post,
  Put,
  Body,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto, ProductUpdateDto } from 'src/tools/dtos/product.dto';
import { Role } from 'src/tools/models/role.model';
import { Roles } from 'src/roles/roles.decorator';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @Roles(Role.storeManager)
  async createProduct(@Body() body: ProductCreateDto): Promise<Product> {
    return await this.productService.create(body);
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.getAll();
  }

  @Get(':id')
  async getProduct(@Param() params): Promise<Product> {
    return await this.productService.getById(params.id);
  }

  @Put(':id')
  @Roles(Role.storeManager)
  async updateProduct(
    @Param('id') id: string,
    @Body() productUpdateDto: ProductUpdateDto,
  ): Promise<Product> {
    return await this.productService.update(id, productUpdateDto);
  }

  @Delete(':id')
  @Roles(Role.storeManager)
  async removeProduct(@Param('id') id: string): Promise<Product> {
    return await this.productService.delete(id);
  }
}
