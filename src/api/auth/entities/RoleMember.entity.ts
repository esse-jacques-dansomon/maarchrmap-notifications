import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './Role.entity';
import { Account } from './Account.entity';

@Entity({ schema: 'auth' })
export class RoleMember {
  @PrimaryColumn()
  roleId: string;

  @PrimaryColumn()
  userAccountId: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'userAccountId' })
  userAccount: Account;
}
