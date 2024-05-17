import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/Notification';
import { NotificationService } from './services/notification/notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  controllers: [],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class BatchProcessingModule {}
