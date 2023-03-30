import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserCreateDto, UserUpdateDto } from 'src/tools/dtos/user.dto';
import { UserModel } from 'src/tools/models/user.model';
import * as mongoose from 'mongoose';
import { ResourceService } from 'libs/services/resource.service';

@Injectable()
export class UserService extends ResourceService<
  UserModel,
  UserCreateDto,
  UserUpdateDto
> {
  constructor(@InjectModel('User') mongoUser: mongoose.Model<UserModel>) {
    super(mongoUser);
  }
}
