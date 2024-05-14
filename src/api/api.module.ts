import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './http.exception.filter';
import { ArchiveModule } from './archive/archive.module';
import { OrganizationModule } from './organization/organization.module';
import { AuthModule } from './auth/auth.module';
import { LifeCycleModule } from './life-cycle/life-cycle.module';
import { ScheduleModule } from './schedule/schedule.module';
import { BatchProcessingModule } from './batch-processing/batch-processing.module';

@Module({
  imports: [
    ArchiveModule,
    OrganizationModule,
    AuthModule,
    LifeCycleModule,
    ScheduleModule,
    BatchProcessingModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class ApiModule {}
