import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './Role.entity';

@Entity({ schema: 'auth' })
export class Privilege {
  @PrimaryColumn()
  roleId: string;

  @Column()
  userStory: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'roleId' })
  role: Role;
}
