import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaarchRmEvent } from '../life-cycle/entities/Event.entity';
import { MaarchRmEventFormat } from '../life-cycle/entities/EventFormat.entity';
import { Account } from '../auth/entities/Account.entity';
import { Organization } from '../organization/entities/Organization.entity';
import { UserPosition } from '../organization/entities/UserPosition.entity';
import { LifeCycleService } from '../life-cycle/services/life-cycle.service';
import { AccountService } from '../auth/services/account.service';
import { OrganizationService } from '../organization/services/organization.service';
import { UserPositionService } from '../organization/services/UserPosition.service';
import { NotificationService } from '../batch-processing/services/notification/notification.service';
import { Notification } from '../batch-processing/entities/Notification';
import { Archive } from '../archive/entities/Archive.entity';
import { ArchiveService } from '../archive/services/archive.service';
import { MedonaMessage } from '../medona/entities/MedonaMessage.entity';
import { MedonaMessageService } from '../medona/services/medona-message.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MaarchRmEvent,
      MaarchRmEventFormat,
      Account,
      Organization,
      UserPosition,

      //
      Notification,
      Archive,

      //
      MedonaMessage,
    ]),
  ],
  providers: [
    TasksService,
    LifeCycleService,
    AccountService,
    OrganizationService,
    UserPositionService,
    NotificationService,
    ArchiveService,
    MedonaMessageService,
  ],
  exports: [TasksService],
})
export class ScheduleModule {}
