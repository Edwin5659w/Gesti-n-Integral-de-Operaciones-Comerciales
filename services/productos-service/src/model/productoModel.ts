import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'productos',
  timestamps: true, 
})
export class ProductModel extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nombre!: string;

  @Column(DataType.STRING)
  descripcion?: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  precio!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stock!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  created_at!: Date;
}
