import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MaarchRmEvent } from '../entities/Event.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MaarchEventDto } from '../dtos/MaarchEventDto';
import { AccountService } from '../../auth/services/account.service';
import { UserPositionService } from '../../organization/services/UserPosition.service';
import { MaarchRmEventFormat } from '../entities/EventFormat.entity';

const DEFAULT_ARCHIVE_SERVICE_EMAILS =
  'bdiarra@boad.org,etokplo@boad.org,aouro@boad.org,jtchalekou@boad.org';

@Injectable()
export class LifeCycleService {
  constructor(
    @InjectRepository(MaarchRmEvent)
    private eventRepository: Repository<MaarchRmEvent>,
    @Inject(UserPositionService)
    private userPositionService: UserPositionService,
    @Inject(AccountService)
    private accountService: AccountService,
    private configService: ConfigService,
  ) {}

  async getLifeCyclesMustOrNotNotified() {
    return await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.eventFormat', 'eventFormat') // Join with eventFormat
      .where('event.axoneNotification = :axoneNotification', {
        axoneNotification: 'notVerified',
      })
      .andWhere('event.axoneNotificationSent = :axoneNotificationSent', {
        axoneNotificationSent: false,
      })
      // .andWhere('eventFormat.notification = :notification', {
      //   notification: true,
      // })
      .getMany();
  }

  async getUnsentLifeCycles(): Promise<MaarchRmEvent[]> {
    const events = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.eventFormat', 'eventFormat') // Join with eventFormat
      .where('event.axoneNotificationSent = :sent', { sent: false })
      .andWhere('event.axoneNotification = :axoneNotification', {
        axoneNotification: 'canBeNotified',
      })
      .andWhere('eventFormat.notification = :notification', {
        notification: true,
      })
      .getMany();
    return events;
  }

  public async unsentLifeCycleToNotification(): Promise<
    {
      eventInfo: Record<string, string>;
      axoneNotificationSent: boolean;
      recipients: any;
      notificationType: string;
      message: string;
      eventFormat: MaarchRmEventFormat;
    }[]
  > {
    const events = await this.getUnsentLifeCycles();
    const data = [];
    for (const event of events) {
      const users = await this.getEventRecipients(event);
      const eventData = {
        recipients: users,
        message: event.description,
        axoneNotificationSent: event.axoneNotificationSent,
        notificationType: event.eventType,
        eventFormat: event.eventFormat,
        eventInfo: event.eventInfoFormatted,
      };
      data.push(eventData);
    }
    return data;
  }

  private getArchiveServiceEmails(): string[] {
    const config =
      this.configService.get<string>('ARCHIVE_SERVICE_EMAILS') ??
      DEFAULT_ARCHIVE_SERVICE_EMAILS;
    return config.split(',').map((e) => e.trim()).filter(Boolean);
  }

  private isRestrictedMode(): boolean {
    const mode =
      this.configService.get<string>('NOTIFICATION_MODE') ?? 'restricted';
    return mode.toLowerCase() === 'restricted';
  }

  /**
   * Liste restreinte : Service des archives + Service versant
   * Liste étendue (all) : Expéditeur + tous les utilisateurs des organisations de l'événement
   */
  async getEventRecipients(
    event: MaarchRmEvent,
    depositorOrgRegNumber?: string,
  ): Promise<string[]> {
    if (!this.isRestrictedMode()) {
      return this.getEventRecipientsAll(event);
    }

    const recipients = new Set<string>(this.getArchiveServiceEmails());

    const orgNumber =
      depositorOrgRegNumber ??
      event.eventInfoFormatted?.depositorOrgRegNumber;

    if (orgNumber) {
      const depositorUsers =
        await this.userPositionService.getUserPositionsByOrgNumber(orgNumber);
      for (const user of depositorUsers) {
        if (user.account?.emailAddress) {
          recipients.add(user.account.emailAddress);
        }
      }
    }

    return Array.from(recipients);
  }

  private async getEventRecipientsAll(event: MaarchRmEvent): Promise<string[]> {
    const recipients = new Set<string>();

    const sender = await this.accountService.getAccountById(event.accountId);
    if (sender?.emailAddress) {
      recipients.add(sender.emailAddress);
    }

    for (const key in event.eventInfoFormatted) {
      const users = await this.userPositionService.getUserPositionsByOrgNumber(
        event.eventInfoFormatted[key],
      );
      for (const user of users) {
        if (user.account?.emailAddress) {
          recipients.add(user.account.emailAddress);
        }
      }
    }

    return Array.from(recipients);
  }

  /**
   * Destinataires Medona :
   * - restricted : Service des archives + Service versant (expéditeur)
   * - all : Utilisateurs des organisations expéditrice et destinataire
   */
  async getMedonaNotificationRecipients(
    senderOrgRegNumber?: string,
    recipientOrgRegNumber?: string,
  ): Promise<string[]> {
    if (!this.isRestrictedMode()) {
      return this.getMedonaNotificationRecipientsAll(
        senderOrgRegNumber,
        recipientOrgRegNumber,
      );
    }

    const recipients = new Set<string>(this.getArchiveServiceEmails());

    if (senderOrgRegNumber) {
      const senderUsers =
        await this.userPositionService.getUserPositionsByOrgNumber(
          senderOrgRegNumber,
        );
      for (const user of senderUsers) {
        if (user.account?.emailAddress) {
          recipients.add(user.account.emailAddress);
        }
      }
    }

    return Array.from(recipients);
  }

  private async getMedonaNotificationRecipientsAll(
    senderOrgRegNumber?: string,
    recipientOrgRegNumber?: string,
  ): Promise<string[]> {
    const orgNumbers = [senderOrgRegNumber, recipientOrgRegNumber].filter(
      Boolean,
    );
    if (orgNumbers.length === 0) {
      return [];
    }

    const users = await this.userPositionService.getUserPositionsByOrgNumbers(
      orgNumbers,
    );
    return users
      .map((u) => u.account?.emailAddress)
      .filter((e): e is string => Boolean(e));
  }

  async saveEvent(event: MaarchRmEvent) {
    await this.eventRepository.save(event);
  }

  private marchRmapEventToEventDto(event: MaarchRmEvent): MaarchEventDto {
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
    eventDto.eventInfoFormated = event.eventInfoFormatted;
    return eventDto;
  }

  public async getRecipientsMailsByrOrgNum(orgNumber: string) {
    return await this.userPositionService.getUserPositionsByOrgNumber(
      orgNumber,
    );
  }

  public async getRecipientsMailsByrOrgNums(orgNumbers: string[]) {
    return await this.userPositionService.getUserPositionsByOrgNumbers(
      orgNumbers,
    );
  }
}
