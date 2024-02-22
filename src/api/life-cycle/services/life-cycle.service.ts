import { Inject, Injectable } from '@nestjs/common';
import { MaarchRmEvent } from '../entities/Event.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MaarchEventDto } from '../dtos/MaarchEventDto';
import { AccountService } from '../../auth/services/account.service';
import { UserPositionService } from '../../organization/services/UserPosition.service';
import { MaarchRmEventFormat } from '../entities/EventFormat.entity';

@Injectable()
export class LifeCycleService {
  constructor(
    @InjectRepository(MaarchRmEvent)
    private eventRepository: Repository<MaarchRmEvent>,
    @Inject(AccountService)
    private accountService: AccountService,
    @Inject(UserPositionService)
    private userPositionService: UserPositionService,
  ) {}

  async getLifeCyclesMustOrNotNotified() {
    return await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.eventFormat', 'eventFormat') // Join with eventFormat
      .where('event.axoneNotification = :axoneNotification', {
        axoneNotification: 'notVerified',
      })
      .getMany();
  }
  async getUnsentLifeCycles(): Promise<MaarchEventDto[]> {
    const events = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.eventFormat', 'eventFormat') // Join with eventFormat
      .where('event.axoneNotificationSent = :sent', { sent: false })
      .andWhere('eventFormat.notification = :notification', {
        notification: false,
      })
      .getMany();
    return events.map((event) => {
      const eventDto = new MaarchEventDto();
      eventDto.eventId = event.eventId;
      eventDto.eventType = event.eventType;
      eventDto.eventFormat = event.eventFormat;
      eventDto.timestamp = event.timestamp;
      eventDto.instanceName = event.instanceName;
      eventDto.orgRegNumber = event.orgRegNumber;
      eventDto.orgUnitRegNumber = event.orgUnitRegNumber;
      eventDto.accountId = event.accountId;
      eventDto.objectClass = event.objectClass;
      eventDto.objectId = event.objectId;
      eventDto.operationResult = event.operationResult;
      eventDto.description = event.description;
      eventDto.eventFormat = event.eventFormat;
      eventDto.eventInfo = event.eventInfo;
      eventDto.axoneNotificationSent = event.axoneNotificationSent;
      eventDto.eventInfoFormat = this.formatEventFormat(
        event.eventInfo,
        event.eventFormat.format,
      );

      return eventDto;
    });
  }

  public async unsentLifeCycleToNotification(): Promise<
    {
      recipients: string[];
      message: string;
      axoneNotificationSent: boolean;
      notificationType: string;
      eventFormat: MaarchRmEventFormat;
    }[]
  > {
    const recipients = [];
    const events = await this.getUnsentLifeCycles();
    for (const event of events) {
      const users = await this.getRecipients(event);
      recipients.push(users);
      event.recipients = users;
    }
    return events.map((event) => {
      return {
        recipients: event.recipients,
        message: event.description,
        axoneNotificationSent: event.axoneNotificationSent,
        notificationType: event.eventType,
        eventFormat: event.eventFormat,
        eventInfo: event.eventInfoFormat,
      };
    });
  }

  private formatEventFormat(
    eventInfo: string,
    keys: string,
  ): Record<string, string> {
    const formattedEventFormat: Record<string, string> = {};
    const formatArray = JSON.parse(eventInfo) as string[];
    const eventInfoArray = keys.split(' ');
    formatArray.forEach((value, index) => {
      formattedEventFormat[eventInfoArray[index]] = value;
    });

    return formattedEventFormat;
  }

  private async getRecipients(event: MaarchEventDto) {
    const recipients: any[] = [];
    const sender = await this.accountService.getAccountById(event.accountId);
    if (sender) {
      recipients.push(sender.emailAddress);
    }
    for (const key in event.eventInfoFormat) {
      const users = await this.userPositionService.getUserPositionsByOrgNumber(
        event.eventInfoFormat[key],
      );
      for (const user of users) {
        if (sender.emailAddress !== user.account.emailAddress) {
          recipients.push(user.account.emailAddress);
        }
      }
    }
    return recipients;
  }

  saveEvent(event: MaarchRmEvent) {
    this.eventRepository.save(event);
  }
}
