import { Producto } from '../models/Producto';

let productos: Producto[] = [];
let nextId = 1;

export class ProductoRepository {
  async create(data: Omit<Producto, 'id' | 'created_at'>) {
    const p: Producto = { 
      id: nextId++, 
      created_at: new Date().toISOString(), 
      ...data 
    };
    productos.push(p);
    return p;
  }

  async findAll() {
    return productos;
  }

  async findById(id: number) {
    return productos.find(p => p.id === id) || null;
  }

  async update(id: number, patch: Partial<Producto>) {
    const idx = productos.findIndex(p => p.id === id);
    if (idx === -1) return null;
    productos[idx] = { ...productos[idx], ...patch };
    return productos[idx];
  }

  async remove(id: number) {
    const idx = productos.findIndex(p => p.id === id);
    if (idx === -1) return false;
    productos.splice(idx, 1);
    return true;
  }

  // Método para reservar stock (usado por ventas-service)
  async reserveStock(id: number, quantity: number) {
    const p = productos.find(prod => prod.id === id);
    if (!p) return { ok: false, reason: 'not_found' };
    if (p.stock < quantity) return { ok: false, reason: 'insufficient_stock' };
    
    p.stock -= quantity;
    return { ok: true, product: p };
  }
}