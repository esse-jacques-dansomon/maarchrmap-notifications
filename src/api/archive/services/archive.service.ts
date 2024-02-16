import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Archive } from '../entities/Archive.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArchiveService {
  constructor(
    @InjectRepository(Archive)
    private readonly archiveRepository: Repository<Archive>,
  ) {}

  async getArchives(): Promise<Archive[]> {
    return await this.archiveRepository.find();
  }
}
