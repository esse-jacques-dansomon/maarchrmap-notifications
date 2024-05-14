import { Inject, Injectable, Logger } from '@nestjs/common';
import { MailService } from '../../mail/mail.service';
import { Cron } from '@nestjs/schedule';
import { NotificationService } from '../batch-processing/services/notification/notification.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    @Inject(MailService)
    private readonly mailService: MailService,
    @Inject(NotificationService)
    private readonly notificationService: NotificationService,
  ) {}

  @Cron('10 * * * * *') // every 45 seconds
  async sendNotifications() {
    const notifications = await this.notificationService.getNotifications();
    this.logger.debug(`Found ${notifications.length} notifications.`);
    for (const notification of notifications) {
      this.logger.debug(`Sending notification to ${notification.receivers}...`);
      await this.mailService.sendMail({
        to: notification.receivers.split(','),
        subject: notification.title,
        text: notification.message,
      });
      notification.status = 'sent';
      await this.notificationService.updateNotification(notification);
    }
  }
}
