import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArchiveService } from './services/archive.service';
import { UserPositionService } from '../organization/services/UserPosition.service';
import { OrganizationService } from '../organization/services/organization.service';
import { AccountService } from '../auth/services/account.service';
import { MailService } from '../../mail/mail.service';

@Controller('archive')
@ApiTags('archive')
export class ArchiveController {
  // @Inject(ArchiveService)
  // private readonly archiveService: ArchiveService;
  // @Inject(UserPositionService)
  // private readonly userPositionService: UserPositionService;
  // @Inject(OrganizationService)
  // private readonly organizationService: OrganizationService;
  // @Inject(AccountService)
  // private readonly accountService: AccountService;
  // @Inject(MailService)
  // private readonly mailService: MailService;
  //
  // @Get()
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'User deleted successfully',
  // })
  // @HttpCode(HttpStatus.OK)
  // async getHello(): Promise<any> {
  //   const archives = await this.archiveService.getArchives();
  //   const data = [];
  //   return archives;
  //   for (const archive of archives) {
  //     const originatorOrganization =
  //       await this.organizationService.getOrganizationByRegistrationNumber(
  //         archive.originatorOrgRegNumber,
  //       );
  //     const depositorOrganization =
  //       await this.organizationService.getOrganizationByRegistrationNumber(
  //         archive.depositorOrgRegNumber,
  //       );
  //     const archiverOrganization =
  //       await this.organizationService.getOrganizationByRegistrationNumber(
  //         archive.archiverOrgRegNumber,
  //       );
  //
  //     const orginatorUserPositions =
  //       await this.userPositionService.getUserPositionsByOrgNumber(
  //         archive.originatorOrgRegNumber,
  //       );
  //     const depositorUserPositions =
  //       await this.userPositionService.getUserPositionsByOrgNumber(
  //         archive.depositorOrgRegNumber,
  //       );
  //
  //     const archiverUserPositions =
  //       await this.userPositionService.getUserPositionsByOrgNumber(
  //         archive.archiverOrgRegNumber,
  //       );
  //
  //     //
  //     data.push({
  //       archive: {
  //         archiveName: archive.archiveName,
  //         originatorOrgRegNumber: archive.originatorOrgRegNumber,
  //         depositorOrgRegNumber: archive.depositorOrgRegNumber,
  //         archiverOrgNumber: archive.archiverOrgRegNumber,
  //       },
  //       originator: {
  //         orgId: originatorOrganization.orgId,
  //         orgName: originatorOrganization.orgName,
  //         orgNum: originatorOrganization.registrationNumber,
  //         users: orginatorUserPositions.map((userPosition) => {
  //           return {
  //             userAccountId: userPosition.userAccountId,
  //             orgId: userPosition.orgId,
  //             orgName: userPosition.organization.orgName,
  //             orgNum: userPosition.organization.registrationNumber,
  //             function: userPosition.function,
  //             default: userPosition.default,
  //             accountName: userPosition.account.accountName,
  //             displayName: userPosition.account.displayName,
  //             emailAddress: userPosition.account.emailAddress,
  //           };
  //         }),
  //       },
  //       depositor: {
  //         orgId: depositorOrganization.orgId,
  //         orgName: depositorOrganization.orgName,
  //         orgNum: depositorOrganization.registrationNumber,
  //         users: depositorUserPositions.map((userPosition) => {
  //           return {
  //             userAccountId: userPosition.userAccountId,
  //             orgId: userPosition.orgId,
  //             orgName: userPosition.organization.orgName,
  //             orgNum: userPosition.organization.registrationNumber,
  //             function: userPosition.function,
  //             default: userPosition.default,
  //             accountName: userPosition.account.accountName,
  //             displayName: userPosition.account.displayName,
  //             emailAddress: userPosition.account.emailAddress,
  //           };
  //         }),
  //       },
  //       archiver: {
  //         orgId: archiverOrganization.orgId,
  //         orgName: archiverOrganization.orgName,
  //         orgNum: archiverOrganization.registrationNumber,
  //         users: archiverUserPositions.map((userPosition) => {
  //           return {
  //             userAccountId: userPosition.userAccountId,
  //             orgId: userPosition.orgId,
  //             orgName: userPosition.organization.orgName,
  //             orgNum: userPosition.organization.registrationNumber,
  //             function: userPosition.function,
  //             default: userPosition.default,
  //             accountName: userPosition.account.accountName,
  //             displayName: userPosition.account.displayName,
  //             emailAddress: userPosition.account.emailAddress,
  //           };
  //         }),
  //       },
  //     });
  //   }
  //
  //   // const mails = [
  //   //   'essedansomon@gmail.com',
  //   //   'makhtar.guey@gmail.com',
  //   //   'gueye.djibril@gmail.com',
  //   //   'akolatse1@gmail.com',
  //   // ];
  //   // //send to organization service
  //   // await this.mailService.sendArchivedNotification(
  //   //   // data[0].originator.users.map((user) => user.emailAddress),
  //   //   mails,
  //   //   'Service producteur',
  //   //   `L' archive ${data[0].archive.archiveName}, `,
  //   //   `Notification de l'archivage pour le service producteur ${data[0].originator.orgName}  ${data[0].originator.orgNum}
  //   //
  //   //   `,
  //   // );
  //   // await this.mailService.sendArchivedNotification(
  //   //   // data[0].depositor.users.map((user) => user.emailAddress),
  //   //   mails,
  //   //   'Service dépositaire',
  //   //   `L' archive ${data[0].archive.archiveName}, `,
  //   //   `Notification de l'archivage pour le service dépositaire ${data[0].depositor.orgName}  ${data[0].depositor.orgNum} `,
  //   // );
  //   // await this.mailService.sendArchivedNotification(
  //   //   // data[0].archiver.users.map((user) => user.emailAddress),
  //   //   mails,
  //   //   'Service archivage',
  //   //   `L' archive ${data[0].archive.archiveName}, `,
  //   //   `Notification de l'archivage pour le service archivage ${data[0].archiver.orgName}  ${data[0].archiver.orgNum} `,
  //   // );
  //   // const accounts = await this.accountService.getAccounts();
  //   // for (const account of accounts) {
  //   //   account.emailAddress = account.accountName + '@axone-sa.com';
  //   //   await this.accountService.updateAccount(account);
  //   // }
  //   return data;
  // }
}
