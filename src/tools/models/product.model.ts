import * as mongoose from 'mongoose';

export class ProductModel {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
}

export const ProductSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  description: String,
  stock: Number,
});
