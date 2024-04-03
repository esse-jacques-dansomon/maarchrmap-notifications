import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ schema: 'recordsManagement.retentionRule' })
export class RetentionRule {
  @PrimaryColumn()
  code: string;

  @Column()
  duration: string;

  @Column({ nullable: true })
  finalDisposition: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  label: string;

  @Column({ nullable: true })
  implementationDate: Date;
}
