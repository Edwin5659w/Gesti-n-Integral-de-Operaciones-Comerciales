import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'productos',
  timestamps: false, 
})
export class ProductoModel extends Model {
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
    defaultValue: DataType.NOW,
  })
  created_at!: Date;
}
