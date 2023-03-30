import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ResourceService } from 'libs/services/resource.service';
import { ProductCreateDto, ProductUpdateDto } from 'src/tools/dtos/product.dto';
import { Product } from 'src/tools/models/product.model';
import * as mongoose from 'mongoose';

@Injectable()
export class ProductService extends ResourceService<
  Product,
  ProductCreateDto,
  ProductUpdateDto
> {
  constructor(@InjectModel('Product') mongoUser: mongoose.Model<Product>) {
    super(mongoUser);
  }
}
