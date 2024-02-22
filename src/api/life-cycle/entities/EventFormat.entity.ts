import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { MaarchRmEvent } from './Event.entity';

@Entity({ schema: 'lifeCycle', name: 'eventFormat' })
export class MaarchRmEventFormat {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  type: string;

  @Column({ type: 'text' })
  format: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'boolean', default: false })
  notification: boolean;

  @OneToMany(() => MaarchRmEvent, (event) => event.eventFormat)
  events: MaarchRmEvent[];
}
