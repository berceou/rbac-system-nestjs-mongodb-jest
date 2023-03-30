import { ApiProperty } from '@nestjs/swagger';

export class StoreCreateDto {
  @ApiProperty()
  name: string;
}

export class StoreUpdateDto {
  @ApiProperty()
  name: string;
}
