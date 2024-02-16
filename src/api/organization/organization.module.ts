import { Module } from '@nestjs/common';
import { OrganizationService } from './services/organization.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArchivalProfileAccess } from './entities/ArchivalProfileAccess.entity';
import { Organization } from './entities/Organization.entity';
import { OrgContact } from './entities/OrgContact.entity';
import { OrgType } from './entities/OrgType.entity';
import { ServicePosition } from './entities/ServicePosition.entity';
import { UserPosition } from './entities/UserPosition.entity';
import { UserPositionService } from './services/UserPosition.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArchivalProfileAccess,
      Organization,
      OrgContact,
      OrgType,
      ServicePosition,
      UserPosition,
    ]),
  ],
  providers: [OrganizationService, UserPositionService],
  exports: [OrganizationService, UserPositionService],
  controllers: [],
})
export class OrganizationModule {}
