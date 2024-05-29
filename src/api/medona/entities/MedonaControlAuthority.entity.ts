import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'medona', name: 'controlAuthority' })
export class MedonaControlAuthority {
  @PrimaryColumn()
  originatorOrgUnitId: string;

  @PrimaryColumn()
  controlAuthorityOrgUnitId: string;
}
