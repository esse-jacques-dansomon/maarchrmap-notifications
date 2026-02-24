import { Inject, Injectable, Logger } from '@nestjs/common';
import { MailService } from '../../mail/mail.service';
import { Cron } from '@nestjs/schedule';
import { LifeCycleService } from '../life-cycle/services/life-cycle.service';
import { ArchiveService } from '../archive/services/archive.service';
import { MedonaMessageService } from '../medona/services/medona-message.service';
import { MedonaMessage } from '../medona/entities/MedonaMessage.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @Inject(MailService)
    private readonly mailService: MailService,
    @Inject(LifeCycleService)
    private readonly lifeCycleService: LifeCycleService,
    @Inject(ArchiveService)
    private readonly archiveService: ArchiveService,
    @Inject(MedonaMessageService)
    private readonly medonaMessageService: MedonaMessageService,
  ) {}

  @Cron('*/60 * * * * *')
  async updateEventNotificationSchedule() {
    const eventLifeCycles =
      await this.lifeCycleService.getLifeCyclesMustOrNotNotified();
    for (const event of eventLifeCycles) {
      const eventFormat = event.eventFormat;
      if (eventFormat.notification) {
        event.axoneNotification = 'canBeNotified';
        const archive = await this.archiveService.getArchiveById(
          event.objectId,
        );
        const users = await this.lifeCycleService.getEventRecipients(
          event,
          archive?.depositorOrgRegNumber,
        );
        try {
          //send mail
          await this.mailService.sendEventMail({
            archive: archive,
            text: event.description,
            subject: event.description,
            data: event.eventInfoFormatted,
            maarchRmEvent: event,
            to: users,
          });
          this.logger.log(
            new Date().toISOString(),
            `Notification sent to ${users} for event ${event.description}`,
          );
        } catch (e) {
          this.logger.error(e);
        } finally {
          event.axoneNotificationSent = true;
          event.axoneNotification = 'canBeNotified';
        }
      } else {
        event.axoneNotification = 'canNotBeNotified';
      }
      await this.lifeCycleService.saveEvent(event);
    }
  }

  @Cron('*/60 * * * * *')
  async notifyArchiverWhenNewMedonaIsReceived() {
    const medonaMessages: MedonaMessage[] =
      await this.medonaMessageService.getMedonaReceivedMessages();
    for (const message of medonaMessages) {
      const usersMails =
        await this.lifeCycleService.getMedonaNotificationRecipients(
          message.senderOrgRegNumber,
          message.recipientOrgRegNumber,
        );
      this.logger.log(
        new Date().toISOString(),
        `Notification sent to ${usersMails} for medona ${message}`,
      );
      //send notification
      await this.mailService.sendMedonaMail({
        to: usersMails,
        subject: "Transfert d'archive",
        medonaMessage: message,
      });
      //save message
      message.isSentNotificationWhenStatusIsReceived = true;
      await this.medonaMessageService.saveMedonaMessage(message);
    }
  }
}
