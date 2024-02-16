import { Entity, PrimaryColumn, Column, Unique } from 'typeorm';

@Entity({ schema: 'auth', name: 'role' })
@Unique(['roleName'])
export class Role {
  @PrimaryColumn()
  roleId: string;

  @Column()
  roleName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  securityLevel: string;

  @Column({ default: true })
  enabled: boolean;
}
