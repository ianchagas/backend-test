import { UpdateResult } from 'typeorm';
import { DataRegisterEntity } from '../infra/typeORM/entities/data-register.entity';

interface IDataRegister {
  createSumValue(
    valor_comprado: number,
    data_movimento: Date,
  ): Promise<DataRegisterEntity>;

  createSubtractValue(
    valor_pago: number,
    data_movimento: Date,
  ): Promise<DataRegisterEntity>;

  updateBalance(): Promise<UpdateResult | any>;

  findHighestOpenValue(): Promise<DataRegisterEntity>;

  deleteData(): Promise<void>;
}

export { IDataRegister };
