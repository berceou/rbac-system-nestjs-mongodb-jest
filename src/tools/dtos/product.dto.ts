import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min, Max } from 'class-validator';

export class ProductCreateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  @Max(500000)
  price: number;
  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  @Max(200)
  stock: number;
  description: string;
}
