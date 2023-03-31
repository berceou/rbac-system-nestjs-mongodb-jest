import { Test, TestingModule } from '@nestjs/testing';
import { UserLoginDto } from 'src/tools/dtos/user.dto';
import { User } from 'src/tools/models/user.model';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

describe('LoginController', () => {
  let controller: LoginController;
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [LoginService],
    }).compile();

    controller = module.get<LoginController>(LoginController);
    service = module.get<LoginService>(LoginService);
  });

  describe('createUser', () => {
    it('should return a user', async () => {
      const user = new User();
      jest.spyOn(service, 'loginUser').mockImplementation(async () => user);

      const body = new UserLoginDto();
      const result = await controller.createUser(body);

      expect(result).toBe(user);
    });
  });
});
