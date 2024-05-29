import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { MedonaMessage } from './MedonaMessage.entity';

@Entity({ schema: 'medona', name: 'messageComment' })
@Unique(['messageId', 'comment'])
export class MedonaMessageComment {
  @PrimaryColumn()
  commentId: string;

  @Column()
  messageId: string;

  @ManyToOne(() => MedonaMessage)
  @JoinColumn({ name: 'messageId' })
  message: MedonaMessage;

  @Column()
  comment: string;
}
