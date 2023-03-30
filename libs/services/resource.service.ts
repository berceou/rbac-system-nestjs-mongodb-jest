import { Model } from 'mongoose';
import { AuditModel } from 'src/tools/models/audit.model';
import { RoleModel } from 'src/tools/models/role.model';

export class ResourceService<T, C, U> {
  constructor(protected readonly mongoModel: Model<T>) {}

  async create(model: C): Promise<T> {
    const audit = new AuditModel();
    audit.active = true;
    audit.createdAt = new Date();
    audit.createdBy = RoleModel.Admin;

    const createdUser = new this.mongoModel({ ...model, ...audit });

    return await createdUser.save();
  }

  async getAll(): Promise<T[]> {
    return await this.mongoModel.find().exec();
  }

  async getById(id: string): Promise<T> {
    return await this.mongoModel.findById(id).exec();
  }

  async update(id: string, dto: U): Promise<T> {
    let newModel = this.mongoModel.findOne({ _id: id }).exec();
    newModel = { ...newModel, ...dto };
    return await this.mongoModel
      .findByIdAndUpdate(id, newModel, { new: true })
      .exec();
  }

  async delete(id: string): Promise<T> {
    return await this.mongoModel.findByIdAndRemove({ _id: id }).exec();
  }
}
