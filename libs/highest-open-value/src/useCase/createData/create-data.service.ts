import { ClientHistoryDto } from '@highest-open-value/highest-open-value/dto/client-history.dto';
import { IDataRegister } from '@highest-open-value/highest-open-value/implementation/data-register.interface';
import { DataRegisterEntity } from '@highest-open-value/highest-open-value/infra/typeORM/entities/data-register.entity';
import { DataRegisterRepository } from '@highest-open-value/highest-open-value/infra/typeORM/repositories/data-register.repository';
import { Inject } from '@nestjs/common';

interface IRequest {
  clientHistoryDto: ClientHistoryDto;
}

export class CreateDataService {
  constructor(
    @Inject(DataRegisterRepository)
    private dataRegisterRepository: IDataRegister,
  ) {}
  async execute({ clientHistoryDto }: IRequest): Promise<DataRegisterEntity> {
    clientHistoryDto.contratos.forEach((contrato) => {
      const qtdeParcelas = contrato.parcelas.length;
      const compra = +contrato.valorfinanciado.toFixed(2);
      const valorPorParcela = compra / qtdeParcelas;

      const infosContratos = {
        dataCompra: contrato.data,
        valorTotalCompra: compra,
        qtdeParcelas: qtdeParcelas,
        valorPorParcela: valorPorParcela,
      };

      this.dataRegisterRepository.createSumValue(
        infosContratos.valorTotalCompra,
        infosContratos.dataCompra,
      );

      contrato.parcelas.forEach((parcela) => {
        const infoParcelas = {
          dataPgto: parcela.dataultimopagamento,
          valorPgto: parcela.totalpago,
        };
        this.dataRegisterRepository.createSubtractValue(
          infoParcelas.valorPgto,
          infoParcelas.dataPgto,
        );
      });
    });

    return;
  }
}
