import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Organization } from './Organization.entity';
import { Account } from '../../auth/entities/Account.entity';
// import { Organization } from './Organization.entity';

@Entity({ schema: 'organization', name: 'userPosition' })
export class UserPosition {
  @PrimaryColumn()
  userAccountId: string;

  @PrimaryColumn()
  orgId: string;

  @Column({ nullable: true })
  function: string;

  @Column({ default: false })
  default: boolean;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'orgId', referencedColumnName: 'orgId' })
  organization: Organization;

  @OneToOne(() => Account)
  @JoinColumn({ name: 'userAccountId', referencedColumnName: 'accountId' })
  account: Account;
}
