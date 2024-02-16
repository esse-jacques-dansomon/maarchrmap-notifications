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

  async getUserPositions(): Promise<UserPosition[]> {
    return this.userPositionRepository.find();
  }

  async getUserPositionsByOrgId(orgId: string): Promise<UserPosition[]> {
    return this.userPositionRepository.find({
      where: { orgId: orgId },
    });
  }
}
