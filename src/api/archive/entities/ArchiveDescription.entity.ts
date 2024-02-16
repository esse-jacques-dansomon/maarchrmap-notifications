import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { ArchivalProfile } from './ArchivalProfile.entity';

@Entity({ schema: 'recordsManagement.descriptionField' })
export class ArchiveDescription {
  @PrimaryColumn()
  archivalProfileId: string;

  @PrimaryColumn()
  fieldName: string;

  @Column({ default: false })
  required: boolean;

  @Column()
  position: number;

  @Column({ default: false })
  isImmutable: boolean;

  @Column({ default: true })
  isRetained: boolean;

  @Column({ default: false })
  isInList: boolean;

  @ManyToOne(() => ArchivalProfile, { onDelete: 'CASCADE' })
  archivalProfile: ArchivalProfile;
}
