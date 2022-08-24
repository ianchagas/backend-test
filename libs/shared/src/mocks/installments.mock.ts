import { InstallmentsDto } from '@highest-open-value/highest-open-value/dto/client-history.dto';

export class InstallmentsMock {
  static InstallmentData() {
    const mockInstallment = new InstallmentsDto();

    (mockInstallment.valorvencimento = 28.73),
      (mockInstallment.datavencimento = new Date());
    mockInstallment.dataultimopagamento = new Date();
    mockInstallment.totalpago = 28.73;
    mockInstallment.capitalaberto = 0;

    return mockInstallment;
  }
}
