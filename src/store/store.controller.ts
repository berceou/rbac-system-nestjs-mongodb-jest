import { StoreService } from './store.service';
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { Role } from 'src/tools/models/role.model';
import { Store } from 'src/tools/models/store.model';
import { StoreCreateDto } from 'src/tools/dtos/store.dto';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Store')
@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.storeManager)
  async createStore(@Body() body: StoreCreateDto): Promise<Store> {
    return await this.storeService.create(body);
  }

  @Get()
  @UseGuards(RolesGuard)
  async getAllStores(): Promise<Store[]> {
    return await this.storeService.getAll();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  async getStore(@Param() params): Promise<Store> {
    return await this.storeService.getById(params.id);
  }
}
