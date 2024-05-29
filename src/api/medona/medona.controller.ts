import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MedonaMessageService } from './services/medona-message.service';
import { MedonaMessage } from './entities/MedonaMessage.entity';

@Controller('medona')
@ApiTags('medona')
export class MedonaController {
  constructor(
    @Inject(MedonaMessageService)
    private readonly medonaMessageService: MedonaMessageService,
  ) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Medona message',
  })
  @HttpCode(HttpStatus.OK)
  async getMedonaReceivedMessages(): Promise<MedonaMessage[]> {
    return await this.medonaMessageService.getMedonaReceivedMessages();
  }
}
