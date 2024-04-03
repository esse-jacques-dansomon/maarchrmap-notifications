import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AccessRule } from '../../api/archive/entities/AccessRule.entity';
import { ArchivalProfile } from '../../api/archive/entities/ArchivalProfile.entity';
import { Archive } from '../../api/archive/entities/Archive.entity';
import { ArchiveDescription } from '../../api/archive/entities/ArchiveDescription.entity';
import { DescriptionField } from '../../api/archive/entities/DescriptionField.entity';
import { RetentionRule } from '../../api/archive/entities/RetentionRule.entity';
import { ServiceLevel } from '../../api/archive/entities/ServiceLevel.entity';
import { UserPosition } from '../../api/organization/entities/UserPosition.entity';
import { Account } from '../../api/auth/entities/Account.entity';
import { Organization } from '../../api/organization/entities/Organization.entity';
import { MaarchRmEvent } from '../../api/life-cycle/entities/Event.entity';
import { MaarchRmEventFormat } from '../../api/life-cycle/entities/EventFormat.entity';
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get<string>('DATABASE_HOST'),
      port: this.config.get<number>('DATABASE_PORT'),
      database: this.config.get<string>('DATABASE_NAME'),
      username: this.config.get<string>('DATABASE_USER'),
      password: this.config.get<string>('DATABASE_PASSWORD'),
      entities: [
        AccessRule,
        ArchivalProfile,
        Archive,
        ArchiveDescription,
        DescriptionField,
        RetentionRule,
        ServiceLevel,
        UserPosition,
        Organization,
        Account,
        MaarchRmEvent,
        MaarchRmEventFormat,
      ],
      migrations: ['dist/db/migrations/*.{ts,js}'],
      migrationsTableName: 'maarchrmap_migrations',
      logger: 'file',
      synchronize: false, // never use TRUE in production!
    };
  }
}
