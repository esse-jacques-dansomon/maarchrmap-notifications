import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ schema: 'batchProcessing', name: 'notification' })
export class Notification {
  @PrimaryColumn({ type: 'text' })
  notificationId: string;

  @Column({ type: 'text', nullable: false })
  receivers: string;

  @Column({ type: 'text', nullable: false })
  message: string;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'timestamp', nullable: false })
  createdDate: Date;

  @Column({ type: 'text', nullable: true })
  createdBy: string;

  @Column({ type: 'text', nullable: false })
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  sendDate: Date;

  @Column({ type: 'text', nullable: true })
  sendBy: string;
}
