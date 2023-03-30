import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserCreateDto, UserUpdateDto } from 'src/tools/dtos/user.dto';
import { UserModel } from 'src/tools/models/user.model';
import * as mongoose from 'mongoose';
import { ResourceService } from 'libs/services/resource.service';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;
const hashtext = process.env.HASH_TEXT;

@Injectable()
export class UserService extends ResourceService<
  UserModel,
  UserCreateDto,
  UserUpdateDto
> {
  constructor(@InjectModel('User') mongoUser: mongoose.Model<UserModel>) {
    super(mongoUser);
  }

  async convertToHash(password: string): Promise<string> {
    let hashPin: string;
    await bcrypt
      .hash(`${hashtext}${password}`, saltRounds)
      .then((hash: string) => {
        hashPin = hash;
      });
    return hashPin;
  }

  async compareHashPins(password: string, hashedPin: string) {
    const match = await bcrypt.compareSync(`${hashtext}${password}`, hashedPin);
    return match;
  }
}
