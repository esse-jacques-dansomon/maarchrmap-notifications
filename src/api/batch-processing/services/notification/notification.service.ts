import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../../entities/Notification';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private accountRepository: Repository<Notification>,
  ) {}

  async getNotifications(): Promise<Notification[]> {
    return this.accountRepository.find({ where: { status: 'pending' } });
  }

  async updateNotification(notification: Notification) {
    return this.accountRepository.save(notification);
  }
}
