import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Archive } from '../api/archive/entities/Archive.entity';
import { MaarchRmEvent } from '../api/life-cycle/entities/Event.entity';

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
    archive: Archive | null;
    maarchRmEvent: MaarchRmEvent;
    to: string | string[];
    subject: string;
    text: string;
    data: any | null;
  }) {
    // const dataTranfomed =
    return await this.mailerService.sendMail({
      to: notification.to,
      subject: notification.subject,
      template: 'notification',
      context: {
        archive: notification.archive,
        eventType: notification.maarchRmEvent.eventType,
        timestamp: notification.maarchRmEvent.timestamp,
        description: notification.maarchRmEvent.description,
        eventInfo: notification.maarchRmEvent.eventInfo,
        event: notification.maarchRmEvent,
        message: notification.text,
        data: notification.data,
        resId: notification.data.resId,
        address: notification.data.address,
        originatorOrgRegNumber: notification.data.originatorOrgRegNumber,
        depositorOrgRegNumber: notification.data.depositorOrgRegNumber,
        archiverOrgRegNumber: notification.data.archiverOrgRegNumber,
        originatorArchiveId: notification.data.originatorArchiveId,
        archivalProfileReference: notification.data.archivalProfileReference,
        result: notification.maarchRmEvent.operationResult,
      },
    });
  }
}
