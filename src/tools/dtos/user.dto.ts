import { ApiProperty } from '@nestjs/swagger';
import { RoleModel } from '../models/role.model';

export class UserCreateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
  role: RoleModel;
}

export class UserLoginDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
