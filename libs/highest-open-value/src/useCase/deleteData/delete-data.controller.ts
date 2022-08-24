import { Response } from 'express';
import { Controller, Delete, HttpStatus, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteDataService } from './delete-data.service';

@ApiTags('Meu Crediário')
@Controller()
export class DeleteDataController {
  constructor(private deleteDataService: DeleteDataService) {}

  @ApiOperation({
    summary:
      'Deleta todos os dados de modo a limpar o banco, para iniciar o fluxo novamente.',
  })
  @Delete('/api/delete_data')
  async handle(@Res() res: Response): Promise<Response> {
    await this.deleteDataService.execute();

    return res.status(HttpStatus.OK).send();
  }
}
