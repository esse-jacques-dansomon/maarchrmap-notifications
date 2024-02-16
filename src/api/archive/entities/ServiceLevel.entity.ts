import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ schema: 'recordsManagement.serviceLevel' })
export class ServiceLevel {
  @PrimaryColumn()
  serviceLevelId: string;

  @Column()
  reference: string;

  @Column()
  digitalResourceClusterId: string;

  @Column({ nullable: true })
  control: string;

  @Column({ default: false })
  default: boolean;

  @Column({ nullable: true })
  samplingFrequency: number;

  @Column({ nullable: true })
  samplingRate: number;
}
