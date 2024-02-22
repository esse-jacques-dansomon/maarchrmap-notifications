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

  async sendMail(data: {
    to: string | string[];
    subject: string;
    text: string;
  }) {
    return await this.mailerService.sendMail({
      to: data.to,
      subject: data.subject,
      text: data.text,
    });
  }

  async sendEventMail(notification: {
    to: string | string[];
    subject: string;
    text: string;
    data: any | null;
  }) {
    return await this.mailerService.sendMail({
      to: notification.to,
      subject: notification.subject,
      template: 'notification',
      context: {
        message: notification.text,
        data: notification.data,
      },
    });
  }
}
