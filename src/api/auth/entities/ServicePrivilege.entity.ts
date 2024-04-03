import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from './Account.entity';

@Entity({ schema: 'auth' })
export class ServicePrivilege {
  @PrimaryColumn()
  accountId: string;

  @Column()
  serviceURI: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'accountId' })
  account: Account;
}
