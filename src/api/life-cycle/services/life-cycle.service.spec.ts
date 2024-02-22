import { Test, TestingModule } from '@nestjs/testing';
import { LifeCycleService } from './life-cycle.service';

describe('LifeCycleService', () => {
  let service: LifeCycleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LifeCycleService],
    }).compile();

    service = module.get<LifeCycleService>(LifeCycleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
