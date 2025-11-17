import { Venta } from '../models/Venta';

let ventas: Venta[] = [];
let nextId = 1;

export class VentaRepository {
  async create(data: Omit<Venta, 'id' | 'created_at'>) {
    const v: Venta = { 
      id: nextId++, 
      created_at: new Date().toISOString(), 
      ...data 
    };
    ventas.push(v);
    return v;
  }

  async findAll() {
    return ventas;
  }

  async findById(id: number) {
    return ventas.find(v => v.id === id) || null;
  }
}