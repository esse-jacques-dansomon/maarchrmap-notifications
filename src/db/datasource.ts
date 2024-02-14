import { DataSource, DataSourceOptions } from 'typeorm';
import { Otp } from '../api/user/entities/otp.entity';
import { LoginHistory } from '../api/user/entities/login-history.entity';
import { User } from '../api/user/entities/user.entity';

export const datasourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: '74.208.37.86',
  port: 5432,
  database: 'axonepay',
  username: 'axone',
  password: 'axone',
  entities: [Otp, LoginHistory, User],
  migrations: ['dist/db/migrations/*.{ts,js}'],
  migrationsTableName: 'axonepay_typeorm_migrations',
  logger: 'file',
  synchronize: false,
};

const datasource = new DataSource(datasourceOptions);
export default datasource;
