import { Response } from 'express';

import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindHighestOpenValueService } from './find-highest-open-value.service';
import { DataRegisterEntity } from '@highest-open-value/highest-open-value/infra/typeORM/entities/data-register.entity';

@ApiTags('Meu Crediário')
@Controller()
export class FindHighestOpenValueController {
  constructor(
    private findHighestOpenValueService: FindHighestOpenValueService,
  ) {}

  @ApiOperation({
    summary:
      'Busca a informação do maior saldo e o respectivo mês que essa soma cumulativa esteve mais alta dentro do histórico.',
  })
  @Get('/api/find_highest_open_value')
  async handle(@Res() res: Response): Promise<Response> {
    const highestOpenValue = await this.findHighestOpenValueService.execute();

    return highestOpenValue
      ? res.status(HttpStatus.OK).json(highestOpenValue)
      : res.status(HttpStatus.OK).send();
  }
}
