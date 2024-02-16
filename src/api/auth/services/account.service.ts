import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Account } from '../entities/Account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async getAccounts(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async getAccountById(userAccountId: string): Promise<Account> {
    return this.accountRepository.findOne({
      where: { accountId: userAccountId },
    });
  }
}
