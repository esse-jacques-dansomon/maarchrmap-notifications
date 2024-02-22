import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LifeCycleService } from './services/life-cycle.service';
import { MaarchEventDto } from './dtos/MaarchEventDto';

@Controller('life-cycle')
@ApiTags('archive')
export class LifeCycleController {
  constructor(private readonly lifeCycleService: LifeCycleService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Life Cycles retrieved successfully',
    isArray: true,
    type: MaarchEventDto,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getUnsentLifeCycles(): Promise<MaarchEventDto[]> {
    return await this.lifeCycleService.getUnsentLifeCycles();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Life Cycles converted to notification successfully',
    isArray: true,
    type: MaarchEventDto,
  })
  @Get('notification')
  @HttpCode(HttpStatus.OK)
  async lifeCycleToNotification(): Promise<any[]> {
    return await this.lifeCycleService.unsentLifeCycleToNotification();
  }
}
