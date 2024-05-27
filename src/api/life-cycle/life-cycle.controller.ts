import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LifeCycleService } from './services/life-cycle.service';
import { MaarchEventDto } from './dtos/MaarchEventDto';
import { MaarchRmEvent } from './entities/Event.entity';
import { MailService } from '../../mail/mail.service';

@Controller('life-cycle')
@ApiTags('archive')
export class LifeCycleController {
  constructor(
    private readonly lifeCycleService: LifeCycleService,
    private readonly mailService: MailService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Life Cycles retrieved successfully',
    isArray: true,
    type: MaarchEventDto,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getUnsentLifeCycles(): Promise<MaarchRmEvent[]> {
    return await this.lifeCycleService.getUnsentLifeCycles();
  }
}
