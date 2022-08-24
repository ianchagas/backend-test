import { IDataRegister } from '@highest-open-value/highest-open-value/implementation/data-register.interface';
import { DataRegisterEntity } from '@highest-open-value/highest-open-value/infra/typeORM/entities/data-register.entity';
import { DataRegisterRepository } from '@highest-open-value/highest-open-value/infra/typeORM/repositories/data-register.repository';
import { Inject } from '@nestjs/common';

export class FindHighestOpenValueService {
  constructor(
    @Inject(DataRegisterRepository)
    private dataRegisterRepository: IDataRegister,
  ) {}
  async execute(): Promise<DataRegisterEntity> {
    const highestOpenValue =
      await this.dataRegisterRepository.findHighestOpenValue();

    return highestOpenValue;
  }
}
