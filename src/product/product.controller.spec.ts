import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductCreateDto } from 'src/tools/dtos/product.dto';
import { RolesGuard } from 'src/roles/roles.guard';
import { Product } from 'src/tools/models/product.model';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  describe('createProduct', () => {
    it('should create a product successfully', async () => {
      // Arrange
      const productCreateDto: ProductCreateDto = {
        name: 'Test Product',
        price: 100,
        description: 'Test Product Description',
        stock: 3,
      };
      const expectedProduct: Product = {
        id: '1',
        ...productCreateDto,
      };
      jest.spyOn(service, 'create').mockResolvedValue(expectedProduct);

      // Act
      const result = await controller.createProduct(productCreateDto);

      // Assert
      expect(result).toEqual(expectedProduct);
    });

    it('should throw an exception if not authorized', async () => {
      // Arrange
      const productCreateDto: ProductCreateDto = {
        name: 'Test Product',
        price: 100,
        description: 'Test Product Description',
        stock: 5,
      };
      jest.spyOn(service, 'create').mockResolvedValue(null);

      // Act & Assert
      await expect(controller.createProduct(productCreateDto)).rejects.toThrow(
        RolesGuard,
      );
    });
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      // Arrange
      const expectedProducts: Product[] = [
        {
          id: '1',
          name: 'Test Product 1',
          price: 100,
          description: 'Test Product 1 Description',
          stock: 10,
        },
        {
          id: '2',
          name: 'Test Product 2',
          price: 200,
          description: 'Test Product 2 Description',
          stock: 9,
        },
      ];
      jest.spyOn(service, 'getAll').mockResolvedValue(expectedProducts);

      // Act
      const result = await controller.getAllProducts();

      // Assert
      expect(result).toEqual(expectedProducts);
    });
  });

  describe('ProductController', () => {
    let controller: ProductController;
    let productService: ProductService;

    beforeEach(async () => {
      const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [ProductController],
        providers: [ProductService],
      }).compile();

      controller = moduleRef.get<ProductController>(ProductController);
      productService = moduleRef.get<ProductService>(ProductService);
    });

    describe('getProduct', () => {
      it('should return a product by id', async () => {
        const mockProduct: Product = {
          id: '1',
          name: 'Mock Product',
          description: 'This is a mock product',
          price: 10.0,
          stock: 788,
        };
        jest
          .spyOn(productService, 'getById')
          .mockResolvedValueOnce(mockProduct);

        const result = await controller.getProduct({ id: '1' });

        expect(result).toEqual(mockProduct);
        expect(productService.getById).toHaveBeenCalledWith('1');
      });
    });
  });
});
