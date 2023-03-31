import { Controller, Post, Body } from '@nestjs/common';
import { UserLoginDto } from 'src/tools/dtos/user.dto';
import { User } from 'src/tools/models/user.model';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  async createUser(@Body() body: UserLoginDto): Promise<User> {
    return await this.loginService.loginUser(body);
  }
}
