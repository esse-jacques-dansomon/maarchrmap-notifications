import { Inject, Injectable, Logger } from '@nestjs/common';
import { MailService } from '../../mail/mail.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    @Inject(MailService)
    private readonly mailService: MailService,
  ) {}

  @Cron('10 * * * * *') // every 45 seconds
  async updateEventNotificationSchedule() {}
}
