import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ schema: 'recordsManagement.descriptionField' })
export class DescriptionField {
  @PrimaryColumn()
  name: string;

  @Column({ nullable: true })
  label: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  default: string;

  @Column({ nullable: true })
  minLength: number;

  @Column({ nullable: true })
  maxLength: number;

  @Column({ nullable: true })
  minValue: number;

  @Column({ nullable: true })
  maxValue: number;

  @Column({ nullable: true })
  enumeration: string;

  @Column({ type: 'jsonb', nullable: true })
  facets: object;

  @Column({ nullable: true })
  pattern: string;

  @Column({ default: false })
  isArray: boolean;
}
