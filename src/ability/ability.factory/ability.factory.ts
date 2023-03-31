import { Injectable } from '@nestjs/common';
import { User } from 'src/tools/models/user.model';
import {
  InferSubjects,
  AbilityBuilder,
  MongoAbility,
  PureAbility,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Role } from 'src/tools/models/role.model';

export enum Action {
  manage = 'manage',
  read = 'read',
}

export type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;
@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const { can, build } = new AbilityBuilder(
      PureAbility as AbilityClass<AppAbility>,
    );

    if (user.role === Role.globalAdmin || user.isAdmin) {
      can(Action.manage, 'all');
    }
    if (user.role === Role.normalUser || !user.isAdmin || !user.isSM) {
      can(Action.read, User);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
