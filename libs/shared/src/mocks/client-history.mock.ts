import { ClientHistoryDto } from '@highest-open-value/highest-open-value/dto/client-history.dto';
import { ContractMock } from './contract.mock';

export class ClientHistoryMock {
  static HistoryData() {
    const mockHistory = new ClientHistoryDto();

    mockHistory.contratos = [ContractMock.ContractData()];

    return mockHistory;
  }

  static BalanceFinalData() {
    const mockHighestOpenValue = [
      {
        mes: '10/2019',
        total_aberto: 3711.27,
      },
    ];

    return mockHighestOpenValue;
  }
}
