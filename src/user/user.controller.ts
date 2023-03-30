import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from 'src/tools/models/user.model';
import { UserCreateDto } from 'src/tools/dtos/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async createUser(@Body() body: UserCreateDto): Promise<UserModel> {
    return await this.userService.createUser(body);
  }

  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return await this.userService.getAllUsers();
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string): Promise<UserModel> {
    return await this.userService.deleteUser(id);
  }
}
