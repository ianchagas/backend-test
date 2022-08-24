import { Response } from 'express';

import { Controller, HttpStatus, Put, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateBalanceService } from './update-balance.service';

@ApiTags('Meu Crediário')
@Controller()
export class UpdateBalanceController {
  constructor(private updateBalanceService: UpdateBalanceService) {}

  @ApiOperation({
    summary:
      'Atualiza o saldo do histórico todo do cliente, de forma retroativa',
  })
  @Put('/api/update_balance')
  async handle(@Res() res: Response): Promise<Response> {
    await this.updateBalanceService.execute();

    return res.status(HttpStatus.OK).send();
  }
}
