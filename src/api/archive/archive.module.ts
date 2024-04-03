import { Module } from '@nestjs/common';
import { ArchiveController } from './archive.controller';
import { ArchiveService } from './services/archive.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessRule } from './entities/AccessRule.entity';
import { ArchivalProfile } from './entities/ArchivalProfile.entity';
import { Archive } from './entities/Archive.entity';
import { ArchiveDescription } from './entities/ArchiveDescription.entity';
import { DescriptionField } from './entities/DescriptionField.entity';
import { RetentionRule } from './entities/RetentionRule.entity';
import { ServiceLevel } from './entities/ServiceLevel.entity';
import { UserPositionService } from '../organization/services/UserPosition.service';
import { UserPosition } from '../organization/entities/UserPosition.entity';
import { Organization } from '../organization/entities/Organization.entity';
import { OrganizationService } from '../organization/services/organization.service';
import { Account } from '../auth/entities/Account.entity';
import { AccountService } from '../auth/services/account.service';

@Module({
  controllers: [ArchiveController],
  imports: [
    TypeOrmModule.forFeature([
      AccessRule,
      ArchivalProfile,
      Archive,
      ArchiveDescription,
      DescriptionField,
      RetentionRule,
      ServiceLevel,
      //
      UserPosition,
      Organization,
      Account,
    ]),
  ],
  providers: [
    ArchiveService,
    UserPositionService,
    OrganizationService,
    AccountService,
  ],
  exports: [ArchiveService],
})
export class ArchiveModule {}
