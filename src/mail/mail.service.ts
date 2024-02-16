import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendArchivedNotification(
    to: string | string[],
    name: string,
    eventType: string,
    content: string,
  ) {
    await this.mailerService.sendMail({
      to: to,
      subject: 'Axone Maarch RMAP - Notification',
      template: 'archive',
      context: {
        name: name,
        eventType: eventType,
        content: content,
      },
    });
  }
}
