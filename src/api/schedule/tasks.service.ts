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

  // @Cron('5 * * * * *') // every 30 seconds
  @Cron('0 */2 * * * *') // every 30 seconds
  async updateEventNotificationSchedule() {
    const eventLifeCycles =
      await this.lifeCycleService.getLifeCyclesMustOrNotNotified();
    console.log('eventLifeCycles Must be sent =>', eventLifeCycles.length);
    for (const event of eventLifeCycles) {
      const eventFormat = event.eventFormat;
      if (eventFormat) {
        if (eventFormat.notification) {
          event.axoneNotification = 'canBeNotified';
        } else {
          event.axoneNotification = 'canNotBeNotified';
        }
        if (!event.axoneNotificationSent) {
          const users = await this.lifeCycleService.getEventRecipients(event);
          const archive = await this.archiveService.getArchiveById(
            event.objectId,
          );
          //send mail
          await this.mailService.sendEventMail({
            archive: archive,
            text: event.description,
            subject: event.eventType,
            data: event.eventInfoFormatted,
            maarchRmEvent: event,
            to: users,
          });
          event.axoneNotificationSent = true;
          console.log('send mail', event.eventType, 'users', users);
        }
        //save event
        await this.lifeCycleService.saveEvent(event);
      }
    }
  }

  // @Cron('15 * * * * *')
  // @Cron('5 * * * * *') // every 30 seconds
  @Cron('0 */2 * * * *')
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
        // to: 'essedansomon@gmail.com',
        to: usersMails,
        subject: "Transfert d'archive",
        medonaMessage: message,
      });
      //save message
      message.isSentNotificationWhenStatusIsReceived = true;
      await this.medonaMessageService.saveMedonaMessage(message);
      console.log('medona mail send', usersMails);
    }
  }
}
