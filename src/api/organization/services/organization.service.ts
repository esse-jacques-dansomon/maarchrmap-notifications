import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Organization } from '../entities/Organization.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async getOrganizationByRegistrationNumber(originatorOrgRegNumber: string) {
    return this.organizationRepository.findOne({
      where: { registrationNumber: originatorOrgRegNumber },
    });
  }
}
