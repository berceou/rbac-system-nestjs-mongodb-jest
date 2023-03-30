import {
  Controller,
  Post,
  Put,
  Body,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from 'src/tools/models/user.model';
import { UserCreateDto, UserUpdateDto } from 'src/tools/dtos/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() body: UserCreateDto): Promise<UserModel> {
    body.password = await this.userService.convertToHash(body.password);
    return await this.userService.create(body);
  }

  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return await this.userService.getAll();
  }

  @Get(':id')
  async getUser(@Param() params): Promise<UserModel> {
    return await this.userService.getById(params.id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<UserModel> {
    return await this.userService.update(id, userUpdateDto);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string): Promise<UserModel> {
    return await this.userService.delete(id);
  }
}
