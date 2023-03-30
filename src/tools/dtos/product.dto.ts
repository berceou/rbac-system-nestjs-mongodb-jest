import { ApiProperty } from '@nestjs/swagger';

export class ProductCreateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  stock: number;
  description: string;
}
export class ProductUpdateDto {
  @ApiProperty()
  price: number;
  @ApiProperty()
  stock: number;
}
