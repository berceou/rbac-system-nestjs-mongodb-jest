import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserCreateDto } from 'src/tools/dtos/user.dto';
import { AuditModel } from 'src/tools/models/audit.model';
import { RoleModel } from 'src/tools/models/role.model';
import { UserModel } from 'src/tools/models/user.model';
import * as mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly mongoUser: mongoose.Model<UserModel>,
  ) {}

  async createUser(user: UserCreateDto): Promise<UserModel> {
    const audit = new AuditModel();
    audit.active = true;
    audit.createdAt = new Date();
    audit.createdBy = RoleModel.Admin;

    const createdUser = new this.mongoUser({ ...user, ...audit });

    return await createdUser.save();
  }

  async getAllUsers(): Promise<UserModel[]> {
    return await this.mongoUser.find().exec();
  }

  async deleteUser(id: string): Promise<UserModel> {
    return await this.mongoUser.findByIdAndRemove({ _id: id }).exec();
  }
}
