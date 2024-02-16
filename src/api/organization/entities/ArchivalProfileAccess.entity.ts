import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Organization } from './Organization.entity';

@Entity({ schema: 'organization', name: 'archivalProfileAccess' })
export class ArchivalProfileAccess {
  @PrimaryColumn()
  orgId: string;

  @PrimaryColumn()
  archivalProfileReference: string;

  @Column({ default: true })
  originatorAccess: boolean;

  @Column({ nullable: true })
  serviceLevelReference: string;

  @Column({ type: 'jsonb', nullable: true })
  userAccess: any;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'orgId' })
  organization: Organization;
}
