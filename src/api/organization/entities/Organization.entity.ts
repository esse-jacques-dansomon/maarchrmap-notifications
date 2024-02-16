import { Entity, PrimaryColumn, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { OrgType } from './OrgType.entity';

@Entity({ schema: 'organization', name: 'organization' })
@Unique(['registrationNumber'])
@Unique(['taxIdentifier'])
export class Organization {
  @PrimaryColumn()
  orgId: string;

  @Column()
  orgName: string;

  @Column({ nullable: true })
  otherOrgName: string;

  @Column()
  displayName: string;

  @Column()
  registrationNumber: string;

  @Column({ type: 'date', nullable: true })
  beginDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  legalClassification: string;

  @Column({ nullable: true })
  businessType: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  orgTypeCode: string;

  @Column({ nullable: true })
  orgRoleCodes: string;

  @Column({ nullable: true })
  taxIdentifier: string;

  @Column({ nullable: true })
  parentOrgId: string;

  @Column({ nullable: true })
  ownerOrgId: string;

  @Column({ nullable: true })
  history: string;

  @Column({ default: false })
  isOrgUnit: boolean;

  @Column({ default: false })
  enabled: boolean;

  // @ManyToOne(() => OrgType)
  // @JoinColumn({ name: 'orgTypeCode' })
  // orgType: OrgType;
  //
  // @ManyToOne(() => Organization)
  // @JoinColumn({ name: 'parentOrgId' })
  // parentOrganization: Organization;
  //
  // @ManyToOne(() => Organization)
  // @JoinColumn({ name: 'ownerOrgId' })
  // ownerOrganization: Organization;
}
