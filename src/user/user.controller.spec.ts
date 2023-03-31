import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from 'src/tools/models/user.model';
import { UserCreateDto } from 'src/tools/dtos/user.dto';
import { ForbiddenException } from '@nestjs/common';
import { Role } from 'src/tools/models/role.model';
import { AbilityFactory } from 'src/ability/ability.factory/ability.factory';
import { ResourceService } from 'libs/services/resource.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  let abilityFactory: AbilityFactory;
  let resourceService: ResourceService;

  const mockUserService = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    convertToHash: jest.fn(),
  };

  const mockAbilityFactory = {
    defineAbility: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: AbilityFactory,
          useValue: mockAbilityFactory,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    abilityFactory = module.get<AbilityFactory>(AbilityFactory);
    resourceService = module.get < ResourceService<User>(ResourceService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    const userCreateDto: UserCreateDto = {
      name: 'name',
      email: 'emailemail.com',
      password: 'secret',
      role: Role.normalUser,
    };

    const allowedUser = {
      id: '6426d75065d8778ff34478c7',
      name: 'admin',
      email: 'admin@gmail.com',
      password: '$2b$10$/PhSuCYB1zrpN3D5yfY//eY3BWLQXEhEH9iEDLFAwVWAL4.r6SW/y',
      role: Role.globalAdmin,
      isAdmin: true,
      isSM: false,
    };

    it('should create a user successfully', async () => {
      const createdUser: User = {
        ...userCreateDto,
        id: '1',
        isAdmin: true,
        isSM: true,
      };

      mockUserService.create.mockResolvedValue(createdUser);

      mockUserService.convertToHash.mockResolvedValue('hashedPassword');

      mockAbilityFactory.defineAbility.mockReturnValue({
        can: jest.fn().mockReturnValue(true),
      });

      const result = await controller.createUser(userCreateDto);

      expect(mockAbilityFactory.defineAbility).toHaveBeenCalledWith(
        allowedUser,
      );

      expect(mockUserService.convertToHash).toHaveBeenCalledWith(
        userCreateDto.password,
      );

      expect(mockUserService.create).toHaveBeenCalledWith({
        ...userCreateDto,
        password: 'hashedPassword',
      });

      expect(result).toEqual(createdUser);
    });

    it('should throw ForbiddenException if user is not allowed', async () => {
      mockAbilityFactory.defineAbility.mockReturnValue({
        can: jest.fn().mockReturnValue(false),
      });

      await expect(controller.createUser(userCreateDto)).rejects.toThrow(
        ForbiddenException,
      );

      expect(mockAbilityFactory.defineAbility).toHaveBeenCalledWith(
        allowedUser,
      );
      expect(mockUserService.create).not.toHaveBeenCalled();
    });
  });
});
