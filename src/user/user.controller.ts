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
import { User } from 'src/tools/models/user.model';
import { UserCreateDto, UserUpdateDto } from 'src/tools/dtos/user.dto';
import { Role } from 'src/tools/models/role.model';
import { Roles } from 'src/roles/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @Roles(Role.globalAdmin)
  async createUser(@Body() body: UserCreateDto): Promise<User> {
    body.password = await this.userService.convertToHash(body.password);
    return await this.userService.create(body);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @Get(':id')
  async getUser(@Param() params): Promise<User> {
    return await this.userService.getById(params.id);
  }

  @Put(':id')
  @Roles(Role.globalAdmin)
  async updateUser(
    @Param('id') id: string,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<User> {
    return await this.userService.update(id, userUpdateDto);
  }

  @Delete(':id')
  @Roles(Role.globalAdmin)
  async removeUser(@Param('id') id: string): Promise<User> {
    return await this.userService.delete(id);
  }
}
