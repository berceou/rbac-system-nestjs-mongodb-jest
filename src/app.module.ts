import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { StoreModule } from './store/store.module';
import { LibsModule } from 'libs/libs.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.DB),
    ProductModule,
    StoreModule,
    LibsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
