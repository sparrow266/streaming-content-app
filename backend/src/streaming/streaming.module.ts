import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamingController } from './controllers/streaming.controller';
import { StreamingService } from './services/streaming.service';
import { StreamingContent } from './entities/streaming.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StreamingContent])],
  controllers: [StreamingController],
  providers: [StreamingService],
  exports: [StreamingService],
})
export class StreamingModule {}
