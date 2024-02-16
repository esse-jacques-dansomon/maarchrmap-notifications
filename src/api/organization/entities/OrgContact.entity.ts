import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Organization } from './Organization.entity';

@Entity({ schema: 'organization', name: 'orgContact' })
export class OrgContact {
  @PrimaryColumn()
  contactId: string;

  @PrimaryColumn()
  orgId: string;

  @Column({ default: false })
  isSelf: boolean;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'orgId' })
  organization: Organization;
}
