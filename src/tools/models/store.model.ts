import * as mongoose from 'mongoose';
import { Product } from './product.model';

export class Store {
  id: string;
  name: string;
  products: Product[];
}

export const StoreSchema = new mongoose.Schema({
  id: { type: String, required: [true, 'Store id is required'] },
  name: String,
  products: Array,
});
