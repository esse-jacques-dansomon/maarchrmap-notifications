import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ schema: 'organization', name: 'orgType' })
export class OrgType {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;
}
