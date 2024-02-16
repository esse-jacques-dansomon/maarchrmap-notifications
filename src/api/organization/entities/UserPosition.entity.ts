import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
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

  // @ManyToOne(() => Organization)
  // @JoinColumn({ name: 'orgId' })
  // organization: Organization;
}
