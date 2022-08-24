import { ColumnNumericTransformer } from '@shared/shared/util/column-numeric-transform';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('data_register')
class DataRegisterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  valor_comprado: number;

  @Column({
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  valor_pago: number;

  @Column({
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  saldo: number;

  @Column({
    type: 'date',
  })
  data_movimento: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { DataRegisterEntity };
