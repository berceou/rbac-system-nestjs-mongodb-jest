import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ResourceService } from 'libs/services/resource.service';
import * as mongoose from 'mongoose';
import { StoreCreateDto, StoreUpdateDto } from 'src/tools/dtos/store.dto';
import { StoreModel } from 'src/tools/models/store.model';

@Injectable()
export class StoreService extends ResourceService<
  StoreModel,
  StoreCreateDto,
  StoreUpdateDto
> {
  constructor(@InjectModel('Store') mongoUser: mongoose.Model<StoreModel>) {
    super(mongoUser);
  }
}
