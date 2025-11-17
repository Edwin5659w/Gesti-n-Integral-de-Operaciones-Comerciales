import { ProductoRepository } from '../repositories/productoRepository';
import { Producto } from '../models/Producto';

export class ProductoService {
  repo = new ProductoRepository();

  async create(data: Omit<Producto, 'id' | 'created_at'>) {
    return this.repo.create(data);
  }

  async list() {
    return this.repo.findAll();
  }

  async get(id: number) {
    return this.repo.findById(id);
  }

  async update(id: number, patch: Partial<Producto>) {
    return this.repo.update(id, patch);
  }

  async delete(id: number) {
    return this.repo.remove(id);
  }

  async reserveStock(id: number, qty: number) {
    return this.repo.reserveStock(id, qty);
  }
}