import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArchiveService } from './services/archive.service';
import { Archive } from './entities/Archive.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArchiveDto } from './dtos/archive.dto';
import { PageDto } from '../../shared/pagination/page.dto';
import { ApiPaginatedResponse } from '../../shared/pagination/pagination.decorator';
import { UserPositionService } from '../organization/services/UserPosition.service';
import { OrganizationService } from '../organization/services/organization.service';
import { AccountService } from '../auth/services/account.service';
import { MailService } from '../../mail/mail.service';

@Controller('archive')
@ApiTags('archive')
export class ArchiveController {
  @Inject(ArchiveService)
  private readonly archiveService: ArchiveService;
  @Inject(UserPositionService)
  private readonly userPositionService: UserPositionService;
  @Inject(OrganizationService)
  private readonly organizationService: OrganizationService;
  @Inject(AccountService)
  private readonly accountService: AccountService;
  @Inject(MailService)
  private readonly mailService: MailService;

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getHello(): Promise<any> {
    const archives = await this.archiveService.getArchives();
    const data = [];
    for (const archive of archives) {
      const originatorOrganization =
        await this.organizationService.getOrganizationByRegistrationNumber(
          archive.originatorOrgRegNumber,
        );
      const depositorOrganization =
        await this.organizationService.getOrganizationByRegistrationNumber(
          archive.depositorOrgRegNumber,
        );
      const archiverOrganization =
        await this.organizationService.getOrganizationByRegistrationNumber(
          archive.archiverOrgRegNumber,
        );

      const orginatorUserPositions =
        await this.userPositionService.getUserPositionsByOrgId(
          originatorOrganization.orgId,
        );
      const depositorUserPositions =
        await this.userPositionService.getUserPositionsByOrgId(
          depositorOrganization.orgId,
        );

      const archiverUserPositions =
        await this.userPositionService.getUserPositionsByOrgId(
          archiverOrganization.orgId,
        );

      //
      data.push({
        archive: {
          archiveName: archive.archiveName,
          originatorOrgRegNumber: archive.originatorOrgRegNumber,
          depositorOrgRegNumber: archive.depositorOrgRegNumber,
          archiverOrgNumber: archive.archiverOrgRegNumber,
        },
        originator: {
          orgId: originatorOrganization.orgId,
          orgName: originatorOrganization.orgName,
          orgNum: originatorOrganization.registrationNumber,
          users: orginatorUserPositions.map((userPosition) => {
            return {
              userAccountId: userPosition.userAccountId,
              orgId: userPosition.orgId,
              orgName: userPosition.organization.orgName,
              function: userPosition.function,
              default: userPosition.default,
              accountName: userPosition.account.accountName,
              displayName: userPosition.account.displayName,
              emailAddress: userPosition.account.emailAddress,
            };
          }),
        },
        depositor: {
          orgId: depositorOrganization.orgId,
          orgName: depositorOrganization.orgName,
          orgNum: depositorOrganization.registrationNumber,
          users: depositorUserPositions.map((userPosition) => {
            return {
              userAccountId: userPosition.userAccountId,
              orgId: userPosition.orgId,
              orgName: userPosition.organization.orgName,
              function: userPosition.function,
              default: userPosition.default,
              accountName: userPosition.account.accountName,
              displayName: userPosition.account.displayName,
              emailAddress: userPosition.account.emailAddress,
            };
          }),
        },
        archiver: {
          orgId: archiverOrganization.orgId,
          orgName: archiverOrganization.orgName,
          orgNum: archiverOrganization.registrationNumber,
          users: archiverUserPositions.map((userPosition) => {
            return {
              userAccountId: userPosition.userAccountId,
              orgId: userPosition.orgId,
              orgName: userPosition.organization.orgName,
              function: userPosition.function,
              default: userPosition.default,
              accountName: userPosition.account.accountName,
              displayName: userPosition.account.displayName,
              emailAddress: userPosition.account.emailAddress,
            };
          }),
        },
      });
    }
    //send to organization service
    await this.mailService.sendArchivedNotification(
      data[0].originator.users.map((user) => user.emailAddress),
      'Service producteur',
      `L' archive ${data[0].archive.archiveName}, `,
      `
      Notification de l'archivage pour le service producteur ${data[0].originator.orgName}  ${data[0].originator.orgNum}
    
      `,
    );
    await this.mailService.sendArchivedNotification(
      data[0].depositor.users.map((user) => user.emailAddress),
      'Esse Jacques Dansomon',
      'Service dépositaire',
      "Notification de l'archivage pour le service dépositaire",
    );
    await this.mailService.sendArchivedNotification(
      data[0].archiver.users.map((user) => user.emailAddress),
      'Esse Jacques Dansomon',
      'Service archivage',
      "Notification de l'archivage pour le service archivage",
    );
    return data;
  }
}
