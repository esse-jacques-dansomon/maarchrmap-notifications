import { Inject, Injectable, Logger } from '@nestjs/common';
import { MailService } from '../../mail/mail.service';
import { Cron } from '@nestjs/schedule';
import { LifeCycleService } from '../life-cycle/services/life-cycle.service';
import { ArchiveService } from '../archive/services/archive.service';

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
  ) {}

  @Cron('0 */2 * * * *') // every 30 seconds
  async updateEventNotificationSchedule() {
    const eventLifeCycles =
      await this.lifeCycleService.getLifeCyclesMustOrNotNotified();
    console.log('Must be sent =>', eventLifeCycles.length);
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
          console.log(archive);
          //send mail
          await this.mailService.sendEventMail({
            archive: archive ?? null,
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
        this.lifeCycleService.saveEvent(event);
      }
    }
  }
}
