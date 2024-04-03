import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { AccessRule } from './AccessRule.entity';
import { RetentionRule } from './RetentionRule.entity';

@Entity({ schema: 'recordsManagement.archivalProfile' })
export class ArchivalProfile {
  @PrimaryColumn()
  archivalProfileId: string;

  @Column()
  reference: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  descriptionSchema: string;

  @Column({ nullable: true })
  descriptionClass: string;

  @Column({ nullable: true })
  retentionStartDate: string;

  @Column({ nullable: true })
  retentionRuleCode: string;

  @ManyToOne(() => AccessRule)
  @JoinColumn({ name: 'accessRuleCode' })
  accessRule: AccessRule;

  @ManyToOne(() => RetentionRule)
  @JoinColumn({ name: 'retentionRuleCode' })
  retentionRule: RetentionRule;

  // Add other columns as needed
}
