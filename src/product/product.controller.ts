import { ProductModel } from 'src/tools/models/product.model';
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

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async createProduct(@Body() body: ProductCreateDto): Promise<ProductModel> {
    return await this.productService.create(body);
  }

  @Get()
  async getAllProducts(): Promise<ProductModel[]> {
    return await this.productService.getAll();
  }

  @Get(':id')
  async getProduct(@Param() params): Promise<ProductModel> {
    return await this.productService.getById(params.id);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productUpdateDto: ProductUpdateDto,
  ): Promise<ProductModel> {
    return await this.productService.update(id, productUpdateDto);
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: string): Promise<ProductModel> {
    return await this.productService.delete(id);
  }
}
