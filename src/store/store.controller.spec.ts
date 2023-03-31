import { Test, TestingModule } from '@nestjs/testing';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { HttpException } from '@nestjs/common';
import { Store } from 'src/tools/models/store.model';
import { StoreCreateDto } from 'src/tools/dtos/store.dto';

describe('StoreController', () => {
  let storeController: StoreController;
  let storeService: StoreService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [StoreController],
      providers: [StoreService],
    }).compile();

    storeController = moduleRef.get<StoreController>(StoreController);
    storeService = moduleRef.get<StoreService>(StoreService);
  });

  describe('createStore', () => {
    it('should create a new store and return the created store', async () => {
      const storeCreateDto: StoreCreateDto = {
        name: 'Test Store',
      };
      const createdStore: Store = {
        id: '1',
        name: 'Test Store',
        products: [],
      };
      jest.spyOn(storeService, 'create').mockResolvedValue(createdStore);

      const result: Store = await storeController.createStore(storeCreateDto);

      expect(result).toEqual(createdStore);
      expect(storeService.create).toHaveBeenCalledWith(storeCreateDto);
    });

    it('should throw an error if store creation fails', async () => {
      const storeCreateDto: StoreCreateDto = {
        name: 'Test Store',
      };
      jest
        .spyOn(storeService, 'create')
        .mockRejectedValue(new HttpException('Error', 500));

      await expect(
        storeController.createStore(storeCreateDto),
      ).rejects.toThrowError(HttpException);
    });
  });

  describe('getAllStores', () => {
    it('should return all stores', async () => {
      const stores: Store[] = [
        {
          id: '1',
          name: 'Store 1',
          products: [],
        },
        {
          id: '2',
          name: 'Store 2',
          products: [],
        },
      ];
      jest.spyOn(storeService, 'getAll').mockResolvedValue(stores);

      const result: Store[] = await storeController.getAllStores();

      expect(result).toEqual(stores);
      expect(storeService.getAll).toHaveBeenCalled();
    });
  });

  describe('getStore', () => {
    it('should return the store with the given id', async () => {
      const storeId = '1';
      const store: Store = {
        id: storeId,
        name: 'Test Store',
        products: [],
      };
      jest.spyOn(storeService, 'getById').mockResolvedValue(store);

      const result: Store = await storeController.getStore({ id: storeId });

      expect(result).toEqual(store);
      expect(storeService.getById).toHaveBeenCalledWith(storeId);
    });
  });
});
