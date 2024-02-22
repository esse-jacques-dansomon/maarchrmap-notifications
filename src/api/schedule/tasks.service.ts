import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { MailService } from '../../mail/mail.service';
import { LifeCycleService } from '../life-cycle/services/life-cycle.service';
import { log, logger } from 'handlebars';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    @Inject(MailService)
    private readonly mailService: MailService,
    @Inject(LifeCycleService)
    private readonly lifeCycleService: LifeCycleService,
  ) {}

  @Cron('10 * * * * *') // every 45 seconds
  async updateEventNotificationSchedule() {
    const eventLifeCycles =
      await this.lifeCycleService.getLifeCyclesMustOrNotNotified();
    console.log('Must be sent =>', eventLifeCycles.length);
    for (const event of eventLifeCycles) {
      const eventFormat = event.eventFormat;
      if (eventFormat) {
        // const message = eventFormat.format;
        if (eventFormat.notification) {
          // event.axoneNotification = 'canBeNotified';
        } else {
          // event.axoneNotification = 'canNotBeNotified';
        }
        if (!event.axoneNotificationSent) {
          const users = await this.lifeCycleService.getEventRecipients(event);
          //send mail
          // await this.mailService.sendEventMail({
          //   text: event.description,
          //   subject: event.eventInfo,
          //   data: this.lifeCycleService.formatEventFormat(
          //     `${event.eventFormat.format}`,
          //     '',
          //   ),
          //   to: users,
          // });
          // event.axoneNotificationSent = true;
          console.log('send mail', event.eventType);
        }
        //save event
        this.lifeCycleService.saveEvent(event);
      }
    }
  }
}
