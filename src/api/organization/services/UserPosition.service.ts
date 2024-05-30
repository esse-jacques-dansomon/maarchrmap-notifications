import { Repository } from 'typeorm';
import { UserPosition } from '../entities/UserPosition.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPositionService {
  constructor(
    @InjectRepository(UserPosition)
    private userPositionRepository: Repository<UserPosition>,
  ) {}

  async getUserPositionsByOrgId(orgId: string): Promise<UserPosition[]> {
    return this.userPositionRepository.find({
      where: { orgId: orgId },
      relations: ['account', 'organization'],
    });
  }
  async getUserPositionsByOrgNumber(
    orgNumber: string,
  ): Promise<UserPosition[]> {
    return await this.userPositionRepository
      .createQueryBuilder('userPosition')
      .leftJoinAndSelect('userPosition.account', 'account')
      .leftJoinAndSelect('userPosition.organization', 'organization')
      .where('organization.registrationNumber = :orgNumber', {
        orgNumber: orgNumber,
      })
      .getMany();
  }

  async getUserPositionsByOrgNumbers(
    orgNumbers: string[],
  ): Promise<UserPosition[]> {
    return await this.userPositionRepository
      .createQueryBuilder('userPosition')
      .leftJoinAndSelect('userPosition.account', 'account')
      .leftJoinAndSelect('userPosition.organization', 'organization')
      .where('organization.registrationNumber IN (:...orgNumbers)', {
        orgNumbers,
      })
      .getMany();
  }
}
