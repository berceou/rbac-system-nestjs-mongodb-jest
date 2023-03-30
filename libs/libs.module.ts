import { Module } from '@nestjs/common';
import { ResourceService } from './services/resource.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ResourceService],
})
export class LibsModule {}
