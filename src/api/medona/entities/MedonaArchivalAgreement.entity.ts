import { Entity, PrimaryColumn, Column, Unique } from 'typeorm';

@Entity({ schema: 'medona', name: 'archivalAgreement' })
@Unique(['reference'])
export class MedonaArchivalAgreement {
  @PrimaryColumn()
  archivalAgreementId: string;

  @Column('text')
  name: string;

  @Column()
  reference: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { nullable: true })
  archivalProfileReference: string;

  @Column('text', { nullable: true })
  serviceLevelReference: string;

  @Column('text')
  archiverOrgRegNumber: string;

  @Column('text')
  depositorOrgRegNumber: string;

  @Column('text', { nullable: true })
  originatorOrgIds: string;

  @Column('date', { nullable: true })
  beginDate: Date;

  @Column('date', { nullable: true })
  endDate: Date;

  @Column('boolean', { nullable: true })
  enabled: boolean;

  @Column('text', { nullable: true })
  allowedFormats: string;

  @Column('int', { nullable: true })
  maxSizeAgreement: number;

  @Column('int', { nullable: true })
  maxSizeTransfer: number;

  @Column('int', { nullable: true })
  maxSizeDay: number;

  @Column('int', { nullable: true })
  maxSizeWeek: number;

  @Column('int', { nullable: true })
  maxSizeMonth: number;

  @Column('int', { nullable: true })
  maxSizeYear: number;

  @Column('boolean', { nullable: true })
  signed: boolean;

  @Column('boolean', { nullable: true })
  autoTransferAcceptance: boolean;

  @Column('boolean', { nullable: true })
  processSmallArchive: boolean;
}
