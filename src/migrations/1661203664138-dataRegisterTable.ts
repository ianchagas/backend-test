import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class dataRegisterTable1661203664138 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'data_register',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'valor_comprado',
            type: 'numeric',
            isNullable: true,
            default: 0,
          },
          {
            name: 'valor_pago',
            type: 'numeric',
            isNullable: true,
            default: 0,
          },
          {
            name: 'saldo',
            type: 'numeric',
            isNullable: true,
            default: 0,
          },
          {
            name: 'data_movimento',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('highest_open_value');
  }
}
