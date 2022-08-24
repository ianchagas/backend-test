import { IDataRegister } from '@highest-open-value/highest-open-value/implementation/data-register.interface';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataRegisterEntity } from '../entities/data-register.entity';

export class DataRegisterRepository implements IDataRegister {
  constructor(
    @InjectRepository(DataRegisterEntity)
    private dataRegisterRepository: Repository<DataRegisterEntity>,
  ) {}

  async createSumValue(
    valor_comprado: number,
    data_movimento: Date,
  ): Promise<DataRegisterEntity> {
    try {
      const data = this.dataRegisterRepository.create({
        valor_comprado,
        data_movimento,
      });
      const saveData = await this.dataRegisterRepository.save(data);
      return saveData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createSubtractValue(
    valor_pago: number,
    data_movimento: Date,
  ): Promise<DataRegisterEntity> {
    try {
      const data = this.dataRegisterRepository.create({
        valor_pago,
        data_movimento,
      });

      const saveData = await this.dataRegisterRepository.save(data);

      return saveData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteData(): Promise<void> {
    await this.dataRegisterRepository.createQueryBuilder().delete().execute();
  }

  async findHighestOpenValue(): Promise<DataRegisterEntity> {
    const highestOpenValue = await this.dataRegisterRepository.query(
      `
      SELECT 
            TO_CHAR(data_movimento, 'MM/YYYY') AS mes,
            (SELECT Max(saldo)
            FROM   data_register dr
            WHERE  dr.id = data_register.id) AS total_aberto
      FROM   data_register
      ORDER  BY 2 DESC
      LIMIT  1 
      `,
    );

    return highestOpenValue;
  }

  async updateBalance(): Promise<any> {
    const updateBalance = this.dataRegisterRepository.query(
      `
      WITH tabela_auxiliar
          AS (SELECT id,
                      data_movimento,
                      novo_saldo,
                      Sum(novo_saldo)
                        OVER (
                          ORDER BY data_movimento ASC, id) AS soma_consecutiva
              FROM   (WITH operacao_valor
                            AS (SELECT id,
                                      data_movimento,
                                      CASE
                                        WHEN dr.valor_comprado IS NOT NULL THEN
                                        'soma'
                                        WHEN dr.valor_pago IS NOT NULL THEN 'subtrai'
                                      END AS operacao,
                                      CASE
                                        WHEN dr.valor_comprado IS NOT NULL THEN
                                        dr.valor_comprado
                                        WHEN dr.valor_pago IS NOT NULL THEN
                                        dr.valor_pago
                                      END AS valor
                                FROM   data_register dr
                                GROUP  BY id)
                      SELECT operacao_valor.id,
                              operacao_valor.data_movimento,
                              Sum(CASE
                                    WHEN operacao_valor.operacao = 'soma' THEN
                                    operacao_valor.valor
                                    ELSE -operacao_valor.valor
                                  END) AS novo_saldo
                        FROM   data_register
                              JOIN operacao_valor
                                ON operacao_valor.id = data_register.id
                        GROUP  BY 1,
                                  2
                        ORDER  BY operacao_valor.data_movimento ASC) AS test
              GROUP  BY 1,
                        2,
                        3)
      UPDATE data_register
      SET    saldo = tabela_auxiliar.soma_consecutiva
      FROM   tabela_auxiliar
      WHERE  data_register.id = tabela_auxiliar.id
      `,
    );

    return updateBalance;
  }
}
