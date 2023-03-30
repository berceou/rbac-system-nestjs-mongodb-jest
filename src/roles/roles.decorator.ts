import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/tools/models/role.model';

export const Roles = (...args: Role[]) => SetMetadata('roles', args);
