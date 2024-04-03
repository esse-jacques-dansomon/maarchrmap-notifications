import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/Account.entity';
import { Privilege } from './entities/Privilege.entity';
import { Role } from './entities/Role.entity';
import { RoleMember } from './entities/RoleMember.entity';
import { ServicePrivilege } from './entities/ServicePrivilege.entity';
import { AccountService } from './services/account.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Account,
      Privilege,
      Role,
      RoleMember,
      ServicePrivilege,
    ]),
  ],
  controllers: [],
  providers: [AccountService],
  exports: [AccountService],
})
export class AuthModule {}
