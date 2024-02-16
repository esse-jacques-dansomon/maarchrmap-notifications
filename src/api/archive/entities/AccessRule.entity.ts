import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ schema: 'recordsManagement.accessRule' })
export class AccessRule {
  @PrimaryColumn()
  code: string;

  @Column({ nullable: true })
  duration: string;

  @Column()
  description: string;
}
