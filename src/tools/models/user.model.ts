import { AuditModel } from './audit.model';
import * as mongoose from 'mongoose';
import { RoleModel } from './role.model';

export class UserModel {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  audit: AuditModel;
  roles: RoleModel;
}

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'User name is required'] },
  surname: { type: String },
  email: {
    type: String,
    lowercase: true,
    required: [true, 'User Email address is required'],
  },
  password: { type: String, required: [true, 'User password is required'] },
  audit: { type: Object },
  roles: { type: String, required: [true, 'User role is required'] },
});
