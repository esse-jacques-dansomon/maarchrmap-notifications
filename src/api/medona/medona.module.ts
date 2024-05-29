import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedonaController } from './medona.controller';
import { MedonaMessage } from './entities/MedonaMessage.entity';
import { MedonaMessageComment } from './entities/MedonaMessageComment.entity';
import { MedonaMessageService } from './services/medona-message.service';

@Module({
  imports: [TypeOrmModule.forFeature([MedonaMessage, MedonaMessageComment])],
  controllers: [MedonaController],
  providers: [MedonaMessageService],
  exports: [MedonaMessageService],
})
export class MedonaModule {}
