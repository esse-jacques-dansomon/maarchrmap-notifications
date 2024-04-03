import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { ServiceLevel } from './ServiceLevel.entity';
import { ArchivalProfile } from './ArchivalProfile.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ schema: 'recordsManagement', name: 'archive' })
export class Archive {
  @ApiProperty()
  @PrimaryColumn()
  archiveId: string;

  @Column({ nullable: true })
  archiverArchiveId: string;

  @Column({ nullable: true })
  originatorArchiveId: string;

  @Column({ nullable: true })
  depositorArchiveId: string;

  @Column()
  archiveName: string;

  @Column()
  filePlanPosition: string;

  @Column({ type: 'date', nullable: true })
  originatingDate: Date;

  @Column()
  archivalProfileReference: string;

  @Column()
  serviceLevelReference: string;

  @Column({ nullable: true })
  archivalAgreementReference: string;

  @Column({ nullable: true })
  retentionRuleCode: string;

  @Column({ type: 'date', nullable: true })
  retentionStartDate: Date;

  @Column({ type: 'interval', nullable: true })
  retentionDuration: string;

  @Column({ nullable: true })
  finalDisposition: string;

  @Column({ type: 'date', nullable: true })
  disposalDate: Date;

  @Column({ nullable: true })
  retentionRuleStatus: string;

  @Column({ nullable: true })
  accessRuleCode: string;

  @Column({ type: 'interval', nullable: true })
  accessRuleDuration: string;

  @Column({ type: 'date', nullable: true })
  accessRuleStartDate: Date;

  @Column({ type: 'date', nullable: true })
  accessRuleComDate: Date;

  @Column({ nullable: true })
  classificationRuleCode: string;

  @Column({ type: 'interval', nullable: true })
  classificationRuleDuration: string;

  @Column({ type: 'date', nullable: true })
  classificationRuleStartDate: Date;

  @Column({ type: 'date', nullable: true })
  classificationEndDate: Date;

  @Column({ nullable: true })
  classificationLevel: string;

  @Column({ nullable: true })
  classificationOwner: string;

  @Column()
  originatorOrgRegNumber: string;

  @Column()
  originatorOwnerOrgId: string;

  @Column({ nullable: true })
  originatorOwnerOrgRegNumber: string;

  @Column()
  depositorOrgRegNumber: string;

  @Column()
  archiverOrgRegNumber: string;

  @Column('simple-array', { nullable: true })
  userOrgRegNumbers: string[];

  @Column({ type: 'timestamp', nullable: true })
  depositDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastCheckDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastDeliveryDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastModificationDate: Date;

  // @Column('simple-array', { nullable: true })
  // lifeCycleEvent: string[];

  @Column()
  status: string;

  @Column('simple-json', { nullable: true })
  description: any;

  @Column()
  fullTextIndexation: string;

  @Column({ nullable: true })
  descriptionClass: string;
  //
  // @Column('simple-json', { nullable: true })
  // descriptionObject: any;

  @Column({ nullable: true })
  fileplanLevel: string;

  @Column({ nullable: true })
  storagePath: string;

  @Column({ nullable: true })
  processingStatus: string;

  @Column({ nullable: true })
  parentArchiveId: number;

  // @OneToOne((type) => Archive, { nullable: true })
  // @JoinColumn()
  // contents: Archive;
  //
  // @ManyToOne(() => ArchivalProfile, { nullable: true })
  // @JoinColumn({ name: "archivalProfileReference" })
  // archivalProfile: ArchivalProfile;
  //
  // @ManyToOne(() => ServiceLevel, { nullable: true })
  // @JoinColumn({ name: "serviceLevelReference" })
  // serviceLevel: ServiceLevel;
}
