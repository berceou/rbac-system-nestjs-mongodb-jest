import { ApiProperty } from '@nestjs/swagger';
import { RoleModel } from '../models/role.model';
import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class UserCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 20)
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  role: RoleModel;
}

export class UserLoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  password: string;
}

export class UserUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 20)
  name: string;
  @ApiProperty()
  @Length(2, 20)
  surname: string;
}
