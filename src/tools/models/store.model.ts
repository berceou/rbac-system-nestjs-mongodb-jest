import * as mongoose from 'mongoose';

export class StoreModel {
  id: string;
  name: string;
}

export const StoreSchema = new mongoose.Schema({
  id: { type: String, required: [true, 'Store id is required'] },
  name: String,
});
