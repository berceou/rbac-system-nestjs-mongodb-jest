import { StoreService } from './store.service';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  SetMetadata,
} from '@nestjs/common';
import { Role } from 'src/tools/models/role.model';
import { Store } from 'src/tools/models/store.model';
import { StoreCreateDto } from 'src/tools/dtos/store.dto';
import { Roles } from 'src/roles/roles.decorator';

@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Post()
  @Roles(Role.storeManager)
  async createStore(@Body() body: StoreCreateDto): Promise<Store> {
    return await this.storeService.create(body);
  }

  @Get()
  async getAllStores(): Promise<Store[]> {
    return await this.storeService.getAll();
  }

  @Get(':id')
  async getStore(@Param() params): Promise<Store> {
    return await this.storeService.getById(params.id);
  }
}
