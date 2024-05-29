import { Module } from '@nestjs/common';
// import { LifeCycleController } from './life-cycle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaarchRmEvent } from './entities/Event.entity';
import { MaarchRmEventFormat } from './entities/EventFormat.entity';
import { LifeCycleService } from './services/life-cycle.service';
import { AccountService } from '../auth/services/account.service';
import { Account } from '../auth/entities/Account.entity';
import { OrganizationService } from '../organization/services/organization.service';
import { Organization } from '../organization/entities/Organization.entity';
import { UserPosition } from '../organization/entities/UserPosition.entity';
import { UserPositionService } from '../organization/services/UserPosition.service';

@Module({
  controllers: [],
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
    LifeCycleService,
    AccountService,
    OrganizationService,
    UserPositionService,
  ],
})
export class LifeCycleModule {}
