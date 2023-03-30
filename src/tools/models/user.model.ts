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
  roles: RoleModel[];
}

export const UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  audit: Object,
  roles: Array,
});
