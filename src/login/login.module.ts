import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/tools/models/user.model';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [LoginService, UserService],
  controllers: [LoginController],
})
export class LoginModule {}
