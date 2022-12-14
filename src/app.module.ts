import { HighestOpenValueModule } from '@highest-open-value/highest-open-value';
import fs from 'fs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SharedModule } from '@shared/shared';
import { getMetadataArgsStorage } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SharedModule,
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT, 10),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      migrations: [process.env.TYPEORM_MIGRATIONS],
      keepConnectionAlive: true,
      maxQueryExecutionTime: 1000,
      migrationsRun: true,
      cli: {
        migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
      },
    } as TypeOrmModuleOptions),
    HighestOpenValueModule,
  ],
})
export class AppModule {}
