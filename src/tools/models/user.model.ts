import { Audit } from './audit.model';
import * as mongoose from 'mongoose';
import { Role } from './role.model';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  audit: Audit;
  role: Role;
}

export interface IAuthenticate {
  readonly user: User;
  readonly token: string;
}

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'User name is required'] },
  email: {
    type: String,
    lowercase: true,
    required: [true, 'User Email address is required'],
  },
  password: { type: String, required: [true, 'User password is required'] },
  audit: { type: Object },
  role: { type: String, required: [true, 'User role is required'] },
});
