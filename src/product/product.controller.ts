import { Product } from 'src/tools/models/product.model';
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto } from 'src/tools/dtos/product.dto';
import { Role } from 'src/tools/models/role.model';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.storeManager)
  async createProduct(@Body() body: ProductCreateDto): Promise<Product> {
    return await this.productService.create(body);
  }

  @Get()
  @UseGuards(RolesGuard)
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.getAll();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  async getProduct(@Param() params): Promise<Product> {
    return await this.productService.getById(params.id);
  }
}
