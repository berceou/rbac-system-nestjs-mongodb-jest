import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';
import { UserLoginDto } from 'src/tools/dtos/user.dto';
import { User } from 'src/tools/models/user.model';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel('User') private readonly userMongo: Model<User>,
    private readonly userService: UserService,
  ) {}

  async loginUser(user: UserLoginDto): Promise<any> {
    try {
      const existUser = await this.userMongo
        .findOne({
          role: user.role,
        })
        .exec();

      if (existUser) {
        let checkPwd;
        await this.userService
          .compareHashPins(user.password, existUser.password)
          .then((resp) => {
            if (resp) {
              checkPwd = true;
            } else {
              checkPwd = false;
            }
          });

        if (checkPwd) {
          const authJsonWebToken = jwt.sign(
            { user: existUser },
            process.env.JWT_TEXT,
          );
          return await { success: true, value: authJsonWebToken };
        } else {
          return await {
            success: false,
            response: 'User password is incorrect!',
          };
        }
      } else {
        return await { success: false, response: 'User does not exist!' };
      }
    } catch (ex) {
      return await {
        success: false,
        response: 'something went wrong',
        exception: ex,
      };
    }
  }
}
