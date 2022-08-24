import { ContractsDto } from '@highest-open-value/highest-open-value/dto/client-history.dto';
import { InstallmentsMock } from './installments.mock';

export class ContractMock {
  static ContractData() {
    const mockCreateNewContract = new ContractsDto();

    mockCreateNewContract.contrato = '0482520370000000000001669920131028';
    mockCreateNewContract.data = new Date();
    mockCreateNewContract.valortotal = 57.45;
    mockCreateNewContract.valorentrada = 0;
    mockCreateNewContract.valorfinanciado = 57.45;
    mockCreateNewContract.parcelas = [InstallmentsMock.InstallmentData()];

    return mockCreateNewContract;
  }
}
