import { IDataRegister } from '@highest-open-value/highest-open-value/implementation/data-register.interface';
import { DataRegisterRepository } from '@highest-open-value/highest-open-value/infra/typeORM/repositories/data-register.repository';
import { Inject } from '@nestjs/common';

export class UpdateBalanceService {
  constructor(
    @Inject(DataRegisterRepository)
    private dataRegisterRepository: IDataRegister,
  ) {}
  async execute(): Promise<any> {
    await this.dataRegisterRepository.updateBalance();
    return;
  }
}
