import { DataRegisterRepository } from '@highest-open-value/highest-open-value/infra/typeORM/repositories/data-register.repository';
import { Test, TestingModule } from '@nestjs/testing';
import spyObject from 'jest-spy-object';
import { mockDataRegisterRepository } from '@shared/shared/mocks';
import { UpdateBalanceService } from './update-balance.service';

describe('Update customer balance retroactively', () => {
  let updateBalanceService: UpdateBalanceService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateBalanceService,
        {
          provide: DataRegisterRepository,
          useValue: mockDataRegisterRepository,
        },
      ],
    }).compile();
    jest.resetAllMocks();

    updateBalanceService =
      module.get<UpdateBalanceService>(UpdateBalanceService);
  });
  it('Should be defined', () => {
    expect(updateBalanceService).toBeDefined();
  });
  describe('Update registers', () => {
    beforeEach(() => {
      jest.restoreAllMocks();

      spyObject(mockDataRegisterRepository);
    });
    it('Should be update customer balance', async () => {
      const result = await updateBalanceService.execute();
      expect(result).toBeUndefined();
    });
  });
});
