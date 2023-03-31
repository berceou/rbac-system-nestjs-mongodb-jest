import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ResourceService } from 'libs/services/resource.service';
import * as mongoose from 'mongoose';
import { StoreCreateDto } from 'src/tools/dtos/store.dto';
import { Store } from 'src/tools/models/store.model';

@Injectable()
export class StoreService extends ResourceService<Store, StoreCreateDto> {
  constructor(@InjectModel('Store') mongoUser: mongoose.Model<Store>) {
    super(mongoUser);
  }
}
