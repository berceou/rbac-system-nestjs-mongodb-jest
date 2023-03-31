import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/tools/models/user.model';
import { UserCreateDto } from 'src/tools/dtos/user.dto';
import { Role } from 'src/tools/models/role.model';
import { Roles } from 'src/roles/roles.decorator';
import {
  AbilityFactory,
  Action,
} from 'src/ability/ability.factory/ability.factory';
import { RolesGuard } from 'src/roles/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private abilityFactory: AbilityFactory,
  ) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.globalAdmin)
  async createUser(@Body() body: UserCreateDto): Promise<User> {
    const allowedUser = {
      id: '6426d75065d8778ff34478c7',
      name: 'admin',
      email: 'admin@gmail.com',
      password: '$2b$10$/PhSuCYB1zrpN3D5yfY//eY3BWLQXEhEH9iEDLFAwVWAL4.r6SW/y',
      role: Role.globalAdmin,
      isAdmin: true,
      isSM: false,
    };
    const ability = this.abilityFactory.defineAbility(allowedUser);
    const isAllowed = ability.can(Action.manage, User);
    if (!isAllowed) {
      throw new ForbiddenException('Only admin can use this action');
    }
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
}
