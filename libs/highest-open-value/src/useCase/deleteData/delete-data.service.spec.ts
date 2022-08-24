import { DataRegisterRepository } from '@highest-open-value/highest-open-value/infra/typeORM/repositories/data-register.repository';
import { Test, TestingModule } from '@nestjs/testing';
import spyObject from 'jest-spy-object';
import { mockDataRegisterRepository } from '@shared/shared/mocks';
import { DeleteDataService } from './delete-data.service';

describe('Delete all register allowing to start a new flow', () => {
  let deleteDataservice: DeleteDataService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteDataService,
        {
          provide: DataRegisterRepository,
          useValue: mockDataRegisterRepository,
        },
      ],
    }).compile();
    jest.resetAllMocks();

    deleteDataservice = module.get<DeleteDataService>(DeleteDataService);
  });
  it('Should be defined', () => {
    expect(deleteDataservice).toBeDefined();
  });
  describe('Delete registers', () => {
    beforeEach(() => {
      jest.restoreAllMocks();

      spyObject(mockDataRegisterRepository);
    });
    it('Should be delete all registers', async () => {
      const result = await deleteDataservice.execute();
      expect(result).toBeUndefined();
    });
  });
});
