import { Entity, PrimaryColumn, Column, Unique } from 'typeorm';

@Entity({ schema: 'auth' })
@Unique(['accountName'])
export class Account {
  @PrimaryColumn()
  accountId: string;

  @Column()
  accountName: string;

  @Column()
  displayName: string;

  @Column({ default: 'user' })
  accountType: string;

  @Column()
  emailAddress: string;

  @Column({ default: true })
  enabled: boolean;

  @Column({ nullable: true })
  password: string;

  @Column({ default: true })
  passwordChangeRequired: boolean;

  @Column({ type: 'timestamp', nullable: true })
  passwordLastChange: Date;

  @Column({ default: false })
  locked: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lockDate: Date;

  @Column({ nullable: true })
  badPasswordCount: number;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;

  @Column({ nullable: true })
  lastIp: string;

  @Column({ nullable: true })
  replacingUserAccountId: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  salt: string;

  @Column({ type: 'timestamp', nullable: true })
  tokenDate: Date;

  @Column({ type: 'jsonb', nullable: true })
  authentication: any;

  @Column({ type: 'jsonb', nullable: true })
  preferences: any;

  @Column({ nullable: true })
  ownerOrgId: string;

  @Column({ default: false })
  isAdmin: boolean;
}
