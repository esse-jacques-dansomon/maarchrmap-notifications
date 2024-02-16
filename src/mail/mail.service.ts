import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Account } from '../api/auth/entities/Account.entity';
import { Archive } from '../api/archive/entities/Archive.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendArchivedNotification(
    emailAddress: string,
    name: string,
    eventType: string,

  ) {
    await this.mailerService.sendMail({
      to: emailAddress,
      subject: 'Axone Maarch RMAP - Notification',
      template: 'archive',
      context: {
        name : name,
        eventType : eventType,
      },
    });
  }
}
