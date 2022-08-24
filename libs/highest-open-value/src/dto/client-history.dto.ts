import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

export class InstallmentsDto {
  @ApiProperty({
    example: 28.73,
  })
  valorvencimento: number;

  @ApiProperty({
    example: '2013-10-28',
  })
  datavencimento: Date;

  @ApiProperty({
    example: '2013-10-28',
  })
  dataultimopagamento: Date;

  @ApiProperty({
    example: 28.73,
  })
  totalpago: number;

  @ApiProperty({
    example: 0,
  })
  capitalaberto: number;
}

export class ContractsDto {
  @ApiProperty({
    type: [InstallmentsDto],
  })
  @IsArray()
  @Type(() => InstallmentsDto)
  parcelas: InstallmentsDto[];

  @ApiProperty({
    example: '0482520370000000000001669920131028',
  })
  contrato: string;

  @ApiProperty({
    example: '2013-10-28',
  })
  data: Date;

  @ApiProperty({
    example: 57.45,
  })
  valortotal: number;

  @ApiProperty({
    example: 0,
  })
  valorentrada: number;

  @ApiProperty({
    example: 57.45,
  })
  valorfinanciado: number;
}

export class ClientHistoryDto {
  @ApiProperty({
    type: [ContractsDto],
  })
  @IsArray()
  @Type(() => ContractsDto)
  contratos: ContractsDto[];
}
