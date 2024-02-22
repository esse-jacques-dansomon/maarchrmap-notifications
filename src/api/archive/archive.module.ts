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
    ]),
  ],
  providers: [ArchiveService],
  exports: [ArchiveService],
})
export class ArchiveModule {}
