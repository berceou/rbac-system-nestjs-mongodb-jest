import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ResourceService } from './resource.service';

const mockModel = () => ({
  find: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
});

describe('ResourceService', () => {
  let service: ResourceService<any, any>;
  let model: Model<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResourceService,
        {
          provide: getModelToken('Product'),
          useFactory: mockModel,
        },
      ],
    }).compile();

    service = module.get<ResourceService<any, any>>(ResourceService);
    model = module.get<Model<any>>(getModelToken('Product'));
  });

  describe('create', () => {
    it('should create and return a new resource', async () => {
      const mockCreateDto = {
        name: 'Test Product',
        price: 20,
        stock: 100,
        description: 'Test description',
      };

      const mockCreatedProduct = {
        _id: '60751c9f9d1db12998e076f2',
        ...mockCreateDto,
      };

      jest.spyOn(model.prototype, 'save').mockResolvedValue(mockCreatedProduct);

      const result = await service.create(mockCreateDto);

      expect(result).toEqual(mockCreatedProduct);
      expect(model.prototype.save).toHaveBeenCalledWith(mockCreateDto);
    });

    it('should throw a NotFoundException if create is unsuccessful', async () => {
      const mockCreateDto = {
        name: 'Test Product',
        price: 20,
        stock: 100,
        description: 'Test description',
      };

      jest.spyOn(model.prototype, 'save').mockResolvedValue(undefined);

      await expect(service.create(mockCreateDto)).rejects.toThrowError(
        NotFoundException,
      );
      expect(model.prototype.save).toHaveBeenCalledWith(mockCreateDto);
    });
  });

  describe('getAll', () => {
    it('should return an array of resources', async () => {
      const mockProducts = [
        {
          _id: '60751c9f9d1db12998e076f2',
          name: 'Test Product 1',
          price: 20,
          stock: 100,
          description: 'Test description 1',
        },
        {
          _id: '60751c9f9d1db12998e076f3',
          name: 'Test Product 2',
          price: 30,
          stock: 200,
          description: 'Test description 2',
        },
      ];

      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockProducts),
      } as any);

      const result = await service.getAll();

      expect(result).toEqual(mockProducts);
      expect(model.find).toHaveBeenCalled();
    });
  });
});
