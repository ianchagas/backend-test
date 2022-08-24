import { Response } from 'express';

import { ClientHistoryDto } from '@highest-open-value/highest-open-value/dto/client-history.dto';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateDataService } from './create-data.service';

@ApiTags('Meu Crediário')
@Controller()
export class CreateDataController {
  constructor(private createDataService: CreateDataService) {}

  @ApiOperation({
    summary:
      'Cria o histórico do cliente em um banco de dados local para posterior calculo de saldo.',
  })
  @Post('/api/create_data')
  async handle(
    @Res() res: Response,
    @Body() clientHistoryDto: ClientHistoryDto,
  ): Promise<Response> {
    await this.createDataService.execute({
      clientHistoryDto,
    });

    return res.status(HttpStatus.OK).send();
  }
}
