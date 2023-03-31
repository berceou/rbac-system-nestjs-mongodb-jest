import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

export class ResourceService<T, C> {
  constructor(protected readonly mongoModel: Model<T>) {}

  async create(model: C): Promise<T> {
    const created = new this.mongoModel({ ...model });

    if (!created) throw new NotFoundException('Could not created');

    return await created.save();
  }

  async getAll(): Promise<T[]> {
    const getAll = await this.mongoModel.find().exec();
    if (!getAll) throw new NotFoundException('Could not get all items');

    return getAll;
  }

  async getById(id: string): Promise<T> {
    const getOne = await this.mongoModel.findById(id).exec();
    if (!getOne) throw new NotFoundException('Could not get item');
    return getOne;
  }
}
