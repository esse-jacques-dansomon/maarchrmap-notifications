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

  @InjectRepository(Archive)
  private readonly invoiceRepository: Repository<Archive>;

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
      const organization =
        await this.organizationService.getOrganizationByRegistrationNumber(
          archive.originatorOrgRegNumber,
        );
      console.log('organization', organization);
      const userPositions =
        await this.userPositionService.getUserPositionsByOrgId(
          organization.orgId,
        );
      console.log('userPositions', userPositions);
      const accounts = [];
      for (const userPosition of userPositions) {
        const account = await this.accountService.getAccountById(
          userPosition.userAccountId,
        );
        accounts.push(account);
      }
      data.push({
        originatorOrgRegNumber: archive.originatorOrgRegNumber,
        archiveId: archive.archiveId,
        archiveName: archive.archiveName,
        accounts,
      });
    }
    return data;
  }
}
