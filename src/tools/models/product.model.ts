import * as mongoose from 'mongoose';

export class ProductModel {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
}

export const ProductSchema = new mongoose.Schema({
  id: { type: String, required: [true, 'Product id is required'] },
  name: { type: String, required: [true, 'Product name is required'] },
  price: { type: Number, required: [true, 'Product price is required'] },
  description: { type: String },
  stock: { type: Number, required: [true, 'Product stock is required'] },
});
