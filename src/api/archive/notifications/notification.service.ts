import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { Archive } from "../entities/Archive.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  @InjectRepository(Archive)
  private readonly invoiceRepository: Repository<Archive>;

  // @Cron("2 * * * * *")
  // handleCron() {
  //   // this.logger.debug("Called when the current second is 2");
  //   // this.invoiceRepository.find().then((archives) => {
  //   //   this.logger.debug(`Found ${archives.length} invoices`);
  //   // });
  // }
}
