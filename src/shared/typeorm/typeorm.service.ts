import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from '../../api/user/entities/user.entity';
import { Otp } from '../../api/user/entities/otp.entity';
import { LoginHistory } from '../../api/user/entities/login-history.entity';
import { Company } from '../../api/invoice/entities/company.entity';
import { Partner } from '../../api/invoice/entities/partner.entity';
import { Invoice } from '../../api/invoice/entities/invoice.entity';

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
      entities: [User, Otp, LoginHistory, Company, Partner, Invoice],
      migrations: ['dist/db/migrations/*.{ts,js}'],
      migrationsTableName: 'axone_pay_typeorm_migrations',
      logger: 'file',
      synchronize: false, // never use TRUE in production!
    };
  }
}
