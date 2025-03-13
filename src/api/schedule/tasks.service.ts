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

  @Cron('*/10 * * * * *') //every 30s
  async updateEventNotificationSchedule() {
    const eventLifeCycles =
      await this.lifeCycleService.getLifeCyclesMustOrNotNotified();
    console.log(
      'eventLifeCycles: axoneNotification(false) => ',
      eventLifeCycles.length,
    );
    for (const event of eventLifeCycles) {
      const eventFormat = event.eventFormat;
      if (eventFormat.notification) {
        event.axoneNotification = 'canBeNotified';
        const users = await this.lifeCycleService.getEventRecipients(event);
        const archive = await this.archiveService.getArchiveById(
          event.objectId,
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
        } catch (e) {
          console.log(e);
        } finally {
          event.axoneNotificationSent = true;
          event.axoneNotification = 'canBeNotified';
          console.log('event', event);
        }
      } else {
        event.axoneNotification = 'canNotBeNotified';
        console.log(
          'eventLifeCycles Must not be sent =>',
          eventFormat.type,
          event.eventType,
        );
      }
      await this.lifeCycleService.saveEvent(event);
    }
  }

  @Cron('*/30 * * * * *') //every 30s
  async notifyArchiverWhenNewMedonaIsReceived() {
    const medonaMessages: MedonaMessage[] =
      await this.medonaMessageService.getMedonaReceivedMessages();
    console.log('modena messages', medonaMessages.length);
    for (const message of medonaMessages) {
      const users = await this.lifeCycleService.getRecipientsMailsByrOrgNums([
        message.recipientOrgRegNumber,
        message.senderOrgRegNumber,
      ]);

      const usersMails = users.map((user) => user.account.emailAddress);
      console.log('users', users.length);
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
  //
  // @Cron('*/30 * * * * *') //every 30s
  // aync watchArchive() {
  //
  // }
}
