import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/tools/models/user.model';
import { AbilityModule } from 'src/ability/ability.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UserModule,
    AbilityModule,
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
