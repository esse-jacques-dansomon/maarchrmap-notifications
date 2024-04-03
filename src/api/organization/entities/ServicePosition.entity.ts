import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
// import { Organization } from './Organization.entity';

@Entity({ schema: 'organization', name: 'servicePosition' })
export class ServicePosition {
  @PrimaryColumn()
  serviceAccountId: string;

  @PrimaryColumn()
  orgId: string;

  // @ManyToOne(() => Organization)
  // @JoinColumn({ name: 'orgId' })
  // organization: Organization;
}
