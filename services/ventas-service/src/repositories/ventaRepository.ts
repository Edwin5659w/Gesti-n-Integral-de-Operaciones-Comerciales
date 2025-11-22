// src/repositories/ventaRepository.ts
import { VentaModel, VentaItemModel } from '../models/Venta';
import { Venta } from '../types/ventas';

export class VentaRepository {
  async findAllVentas(): Promise<Venta[]> {
    const ventas = await VentaModel.findAll({ include: [VentaItemModel] });
    return ventas.map((v) => v.toJSON() as Venta);
  }

  async findVentaById(id: number): Promise<Venta | null> {
    const venta = await VentaModel.findByPk(id, { include: [VentaItemModel] });
    return venta ? (venta.toJSON() as Venta) : null;
  }

  async createVenta(data: Omit<Venta, 'id' | 'created_at'>): Promise<Venta> {
    const newVenta = await VentaModel.create(
      {
        client_id: data.client_id,
        total: Number(data.total),
        created_at: new Date(),
        items: data.items,
      },
      { include: [VentaItemModel] }
    );
    return newVenta.toJSON() as Venta;
  }

  async updateVenta(id: number, data: Partial<Venta>): Promise<Venta | null> {
    const venta = await VentaModel.findByPk(id, { include: [VentaItemModel] });
    if (!venta) return null;

    await venta.update({
      client_id: data.client_id ?? venta.client_id,
      total: Number(data.total ?? venta.total),
    });

    // Si hay items nuevos, reemplaza los existentes
    if (data.items) {
      await VentaItemModel.destroy({ where: { venta_id: id } });
      await VentaItemModel.bulkCreate(
        data.items.map((i) => ({ ...i, venta_id: id }))
      );
    }

    return venta.toJSON() as Venta;
  }

  async deleteVenta(id: number): Promise<boolean> {
    const deleted = await VentaModel.destroy({ where: { id } });
    return deleted > 0;
  }
}
