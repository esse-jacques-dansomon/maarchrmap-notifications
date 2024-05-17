import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { ApiResponse } from '@nestjs/swagger';
import { MaarchRmEventFormat } from './EventFormat.entity';
import { Expose } from 'class-transformer';

@Entity({ schema: 'lifeCycle', name: 'event' })
export class MaarchRmEvent {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  eventId: string;

  @Column({ type: 'text' })
  eventType: string;

  @Column({ type: 'timestamp', precision: 6 })
  timestamp: Date;

  @Column({ type: 'text' })
  instanceName: string;

  @Column({ type: 'text', nullable: true })
  orgRegNumber: string;

  @Column({ type: 'text', nullable: true })
  orgUnitRegNumber: string;

  @Column({ type: 'text', nullable: true })
  accountId: string;

  @Column({ type: 'text' })
  objectClass: string;

  @Column({ type: 'text' })
  objectId: string;

  @Column({ type: 'boolean', nullable: true })
  operationResult: boolean;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  eventInfo: string;

  @ManyToOne(() => MaarchRmEventFormat, (eventFormat) => eventFormat.events, {
    eager: true,
  })
  @JoinColumn({ name: 'eventType' }) // Foreign key column name
  eventFormat: MaarchRmEventFormat;

  @Column({
    type: 'enum',
    default: 'notVerified',
    enum: ['notVerified', 'canBeNotified', 'canNotBeNotified'],
  })
  axoneNotification: string;

  @Column({ type: 'boolean', default: false })
  axoneNotificationSent: boolean;

  @Expose()
  get eventInfoFormatted(): Record<string, string> {
    const formattedEventFormat: Record<string, string> = {};
    const formatArray = JSON.parse(this.eventInfo) as string[];
    const eventInfoArray = this.eventFormat.format.split(' ');
    formatArray.forEach((value, index) => {
      formattedEventFormat[eventInfoArray[index]] = value;
    });
    return formattedEventFormat;
  }
}
