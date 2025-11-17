import axios from 'axios';
import { VentaRepository } from '../repositories/ventaRepository';
import { VentaItem } from '../models/Venta';

const CLIENTS_BASE = process.env.CLIENTS_URL || 'http://localhost:3001/api/v1/clients';
const PRODUCTS_BASE = process.env.PRODUCTS_URL || 'http://localhost:3002/api/v1/products';

export class VentaService {
  repo = new VentaRepository();

  async create(client_id: number, items: VentaItem[]) {
    // 1. Validar que cliente existe
    try {
      const clientResp = await axios.get(`${CLIENTS_BASE}/${client_id}`, { timeout: 5000 });
      if (!clientResp.data) throw new Error('Cliente no válido');
    } catch (err: any) {
      throw { status: 400, message: `Cliente ${client_id} inválido o no existe`, detail: err?.message };
    }

    // 2. Validar productos y calcular total
    let total = 0;
    const itemsWithPrice: VentaItem[] = [];

    for (const it of items) {
      try {
        const pResp = await axios.get(`${PRODUCTS_BASE}/${it.product_id}`, { timeout: 5000 });
        const prod = pResp.data;
        
        if (!prod) throw new Error(`Producto ${it.product_id} no válido`);
        if (prod.stock < it.quantity) {
          throw { status: 409, message: `Stock insuficiente para producto ${it.product_id}. Stock disponible: ${prod.stock}` };
        }
        
        const itemPrice = prod.precio * it.quantity;
        total += itemPrice;
        itemsWithPrice.push({ ...it, price: prod.precio });
      } catch (err: any) {
        throw err?.status ? err : { status: 400, message: `Error al validar producto ${it.product_id}`, detail: err?.message };
      }
    }

    // 3. Reservar stock para cada producto (transacción distribuida simple)
    const reservedItems = [];
    try {
      for (const it of itemsWithPrice) {
        const reserveResp = await axios.post(
          `${PRODUCTS_BASE}/${it.product_id}/reserve`,
          { quantity: it.quantity },
          { timeout: 5000 }
        );
        reservedItems.push(it.product_id);
      }
    } catch (err: any) {
      // Si falla, en producción hacer compensación (liberar stock)
      console.error(`⚠️ Error reservando stock. Items reservados: ${reservedItems.join(', ')}`);
      throw { status: 400, message: `No se pudo reservar stock`, detail: err?.message };
    }

    // 4. Persistir venta en repositorio local
    const created = await this.repo.create({ client_id, items: itemsWithPrice, total });
    return created;
  }

  async list() {
    return this.repo.findAll();
  }

  async get(id: number) {
    return this.repo.findById(id);
  }
}