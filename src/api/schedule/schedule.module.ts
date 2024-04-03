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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MaarchRmEvent,
      MaarchRmEventFormat,
      Account,
      Organization,
      UserPosition,
    ]),
  ],
  providers: [
    TasksService,
    LifeCycleService,
    AccountService,
    OrganizationService,
    UserPositionService,
  ],
  exports: [TasksService],
})
export class ScheduleModule {}
