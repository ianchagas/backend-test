import { ClientHistoryMock } from './client-history.mock';
import { ContractMock } from './contract.mock';
import { InstallmentsMock } from './installments.mock';

export const client_history_mock = ClientHistoryMock.HistoryData();
export const create_sum_value_mock = ContractMock.ContractData();
export const create_subtract_value_mock = InstallmentsMock.InstallmentData();
export const highest_open_value_mock = ClientHistoryMock.BalanceFinalData();

export const mockDataRegisterRepository = {
  create: () => client_history_mock,
  createSumValue: () => create_sum_value_mock,
  createSubtractValue: () => create_subtract_value_mock,
  updateBalance: () => null,
  findHighestOpenValue: () => highest_open_value_mock,
  deleteData: () => null,
};
