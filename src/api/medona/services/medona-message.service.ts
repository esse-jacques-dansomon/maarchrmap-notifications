import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedonaMessage } from '../entities/MedonaMessage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MedonaMessageService {
  constructor(
    @InjectRepository(MedonaMessage)
    private readonly medonaMessageRepository: Repository<MedonaMessage>,
  ) {}

  async getMedonaReceivedMessages(): Promise<MedonaMessage[]> {
    return await this.medonaMessageRepository.find({
      where: {
        status: 'received',
        isSentNotificationWhenStatusIsReceived: false,
      },
    });
  }

  async saveMedonaMessage(message: MedonaMessage) {
    return await this.medonaMessageRepository.save(message);
  }
}
