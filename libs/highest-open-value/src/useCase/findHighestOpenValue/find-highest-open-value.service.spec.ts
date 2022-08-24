import { DataRegisterRepository } from '@highest-open-value/highest-open-value/infra/typeORM/repositories/data-register.repository';
import { Test, TestingModule } from '@nestjs/testing';
import spyObject from 'jest-spy-object';
import { mockDataRegisterRepository } from '@shared/shared/mocks';
import { FindHighestOpenValueService } from './find-highest-open-value.service';
import { ClientHistoryMock } from '@shared/shared/mocks/client-history.mock';

describe('Search for the highest balance amount in all customer history', () => {
  let findHighestOpenValueService: FindHighestOpenValueService;
  let mockHighestOpenValue = ClientHistoryMock.BalanceFinalData();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindHighestOpenValueService,
        {
          provide: DataRegisterRepository,
          useValue: mockDataRegisterRepository,
        },
      ],
    }).compile();
    jest.resetAllMocks();

    findHighestOpenValueService = module.get<FindHighestOpenValueService>(
      FindHighestOpenValueService,
    );
  });
  it('Should be defined', () => {
    expect(FindHighestOpenValueService).toBeDefined();
  });
  describe('Search for the highest balance amount', () => {
    beforeEach(() => {
      jest.restoreAllMocks();

      spyObject(mockDataRegisterRepository);
    });
    it('Should be search', async () => {
      jest
        .spyOn(mockDataRegisterRepository, 'findHighestOpenValue')
        .mockReturnValue([
          {
            mes: '10/2019',
            total_aberto: 3711.27,
          },
        ]);
    });
    it('Should be Search for the highest balance amount and returns that amount', async () => {
      const result = await findHighestOpenValueService.execute();

      expect(result).toStrictEqual(mockHighestOpenValue);
    });
  });
});
