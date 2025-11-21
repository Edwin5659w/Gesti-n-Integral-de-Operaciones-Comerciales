import { Table, Column, Model, DataType, HasMany, ForeignKey } from 'sequelize-typescript';

@Table({ tableName: 'ventas', timestamps: false })
export class VentaModel extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id!: number;

  // Identificador del cliente proveniente del microservicio de Clientes (vía HTTP)
  @Column({ type: DataType.INTEGER, allowNull: false })
  client_id!: number;

  // Monto total de la venta (calculado en el servicio)
  @Column({ type: DataType.FLOAT, allowNull: false })
  total!: number;

  // Fecha de creación; en el DTO puedes mapearlo a string ISO
  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  created_at!: Date;

  // Relación interna: una venta tiene muchos ítems
  @HasMany(() => VentaItemModel)
  items!: VentaItemModel[];
}

@Table({ tableName: 'venta_items', timestamps: false })
export class VentaItemModel extends Model {
  @Column({ type: DataType.INTEGER, allowNull: false })
  product_id!: number; // ID del producto del microservicio de Productos (vía HTTP)

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity!: number;

  @Column({ type: DataType.FLOAT, allowNull: true })
  price?: number; // Precio unitario usado en la venta (snapshoot en el momento)

  // Clave foránea interna hacia ventas
  @ForeignKey(() => VentaModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  venta_id!: number;
}
