import { DataRegisterRepository } from '@highest-open-value/highest-open-value/infra/typeORM/repositories/data-register.repository';
import { Test, TestingModule } from '@nestjs/testing';
import spyObject from 'jest-spy-object';
import { mockDataRegisterRepository } from '@shared/shared/mocks';
import { CreateDataService } from './create-data.service';
import { ClientHistoryMock } from '@shared/shared/mocks/client-history.mock';

describe('Create new history client register', () => {
  let createDataService: CreateDataService;
  let mockCreateNewRegister = ClientHistoryMock.HistoryData();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateDataService,
        {
          provide: DataRegisterRepository,
          useValue: mockDataRegisterRepository,
        },
      ],
    }).compile();
    jest.resetAllMocks();

    createDataService = module.get<CreateDataService>(CreateDataService);
  });
  it('Should be defined', () => {
    expect(createDataService).toBeDefined();
  });
  describe('Create registers', () => {
    beforeEach(() => {
      jest.restoreAllMocks();

      spyObject(mockDataRegisterRepository);
    });
    it('Should be create a new register and return no payload', async () => {
      const result = await createDataService.execute({
        clientHistoryDto: mockCreateNewRegister,
      });
      expect(result).toBeUndefined();
    });
  });
});
