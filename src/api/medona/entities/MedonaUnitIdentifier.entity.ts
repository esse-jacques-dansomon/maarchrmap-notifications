import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { MedonaMessage } from './MedonaMessage.entity';

@Entity({ schema: 'medona', name: 'unitIdentifier' })
@Unique(['messageId', 'objectClass', 'objectId'])
export class MedonaUnitIdentifier {
  @PrimaryColumn()
  messageId: string;

  @ManyToOne(() => MedonaMessage)
  @JoinColumn({ name: 'messageId' })
  message: MedonaMessage;

  @PrimaryColumn()
  objectClass: string;

  @PrimaryColumn()
  objectId: string;
}
