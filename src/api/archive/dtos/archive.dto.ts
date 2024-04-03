import { ApiProperty } from '@nestjs/swagger';

export class ArchiveDto {
  @ApiProperty()
  archiveId: string;

  @ApiProperty()
  archiverArchiveId: string;

  @ApiProperty()
  originatorArchiveId: string;

  @ApiProperty()
  depositorArchiveId: string;

  @ApiProperty()
  archiveName: string;

  @ApiProperty()
  filePlanPosition: string;

  @ApiProperty()
  originatingDate: Date;

  @ApiProperty()
  archivalProfileReference: string;

  @ApiProperty()
  serviceLevelReference: string;

  @ApiProperty()
  archivalAgreementReference: string;

  @ApiProperty()
  retentionRuleCode: string;

  @ApiProperty()
  retentionStartDate: Date;

  @ApiProperty()
  retentionDuration: string;

  @ApiProperty()
  finalDisposition: string;

  @ApiProperty()
  disposalDate: Date;

  @ApiProperty()
  retentionRuleStatus: string;

  @ApiProperty()
  accessRuleCode: string;

  @ApiProperty()
  accessRuleDuration: string;

  @ApiProperty()
  accessRuleStartDate: Date;

  @ApiProperty()
  accessRuleComDate: Date;

  @ApiProperty()
  classificationRuleCode: string;

  @ApiProperty()
  classificationRuleDuration: string;

  @ApiProperty()
  classificationRuleStartDate: Date;

  @ApiProperty()
  classificationEndDate: Date;

  @ApiProperty()
  classificationLevel: string;

  @ApiProperty()
  classificationOwner: string;

  @ApiProperty()
  originatorOrgRegNumber: string;

  @ApiProperty()
  originatorOwnerOrgId: string;

  @ApiProperty()
  originatorOwnerOrgRegNumber: string;

  @ApiProperty()
  depositorOrgRegNumber: string;

  @ApiProperty()
  archiverOrgRegNumber: string;

  @ApiProperty()
  userOrgRegNumbers: string[];

  @ApiProperty()
  depositDate: Date;

  @ApiProperty()
  lastCheckDate: Date;

  @ApiProperty()
  lastDeliveryDate: Date;

  @ApiProperty()
  lastModificationDate: Date;

  @ApiProperty()
  status: string;

  @ApiProperty()
  description: any;

  @ApiProperty()
  fullTextIndexation: string;

  @ApiProperty()
  descriptionClass: string;

  // @ApiProperty()
  // descriptionObject: any;

  @ApiProperty()
  fileplanLevel: string;

  @ApiProperty()
  storagePath: string;

  @ApiProperty()
  processingStatus: string;

  @ApiProperty()
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
