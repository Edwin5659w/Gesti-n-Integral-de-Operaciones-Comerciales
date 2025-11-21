import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'clientes',
  timestamps: false, // ponlo en true si quieres que Sequelize maneje createdAt/updatedAt automáticamente
})
export class ClienteModel extends Model {
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

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  telefono?: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  created_at!: Date;
}
