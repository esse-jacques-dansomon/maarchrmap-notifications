import { Entity, PrimaryColumn, Column, Unique } from 'typeorm';

@Entity({ schema: 'medona', name: 'message' })
@Unique(['type', 'reference', 'senderOrgRegNumber'])
export class MedonaMessage {
  @PrimaryColumn()
  messageId: string;

  @Column('text', { nullable: true })
  schema: string;

  @Column()
  type: string;

  @Column('text')
  status: string;

  @Column('timestamp', { precision: 6 })
  date: Date;

  @Column()
  reference: string;

  @Column('text', { nullable: true })
  accountId: string;

  @Column()
  senderOrgRegNumber: string;

  @Column('text', { nullable: true })
  senderOrgName: string;

  @Column('text')
  recipientOrgRegNumber: string;

  @Column('text', { nullable: true })
  recipientOrgName: string;

  @Column('text', { nullable: true })
  archivalAgreementReference: string;

  @Column('text', { nullable: true })
  replyCode: string;

  @Column('timestamp', { precision: 6, nullable: true })
  operationDate: Date;

  @Column('timestamp', { precision: 6, nullable: true })
  receptionDate: Date;

  @Column('text', { nullable: true })
  relatedReference: string;

  @Column('text', { nullable: true })
  requestReference: string;

  @Column('text', { nullable: true })
  replyReference: string;

  @Column('text', { nullable: true })
  authorizationReference: string;

  @Column('text', { nullable: true })
  authorizationReason: string;

  @Column('text', { nullable: true })
  authorizationRequesterOrgRegNumber: string;

  @Column('boolean', { nullable: true })
  derogation: boolean;

  @Column('int', { nullable: true })
  dataObjectCount: number;

  @Column('numeric', { nullable: true })
  size: number;

  @Column('json', { nullable: true })
  data: any;

  @Column('boolean', { nullable: true })
  active: boolean;

  @Column('boolean', { nullable: true })
  archived: boolean;

  @Column('boolean', { default: false })
  isSentNotificationWhenStatusIsReceived: boolean;
}
