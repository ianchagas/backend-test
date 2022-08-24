import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataRegisterEntity } from './infra/typeORM/entities/data-register.entity';
import { DataRegisterRepository } from './infra/typeORM/repositories/data-register.repository';
import { CreateDataController } from './useCase/createData/create-data.controller';
import { CreateDataService } from './useCase/createData/create-data.service';
import { DeleteDataController } from './useCase/deleteData/delete-data.controller';
import { DeleteDataService } from './useCase/deleteData/delete-data.service';
import { FindHighestOpenValueController } from './useCase/findHighestOpenValue/find-highest-open-value.controller';
import { FindHighestOpenValueService } from './useCase/findHighestOpenValue/find-highest-open-value.service';
import { UpdateBalanceController } from './useCase/updateBalance/update-balance.controller';
import { UpdateBalanceService } from './useCase/updateBalance/update-balance.service';

@Module({
  controllers: [
    CreateDataController,
    UpdateBalanceController,
    FindHighestOpenValueController,
    DeleteDataController,
  ],
  imports: [TypeOrmModule.forFeature([DataRegisterEntity])],
  providers: [
    CreateDataService,
    UpdateBalanceService,
    FindHighestOpenValueService,
    DeleteDataService,
    DataRegisterRepository,
  ],
})
export class HighestOpenValueModule {}
