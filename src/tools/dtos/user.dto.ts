import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../models/role.model';
import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class UserCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 20)
  name: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  role: Role;
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
}
