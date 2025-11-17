import { Cliente } from '../models/Cliente';

let clientes: Cliente[] = [];
let nextId = 1;

export class ClienteRepository {
  async create(data: Omit<Cliente, 'id' | 'created_at'>) {
    const c: Cliente = { 
      id: nextId++, 
      created_at: new Date().toISOString(), 
      ...data 
    };
    clientes.push(c);
    return c;
  }

  async findAll() {
    return clientes;
  }

  async findById(id: number) {
    return clientes.find(c => c.id === id) || null;
  }

  async update(id: number, patch: Partial<Cliente>) {
    const idx = clientes.findIndex(c => c.id === id);
    if (idx === -1) return null;
    clientes[idx] = { ...clientes[idx], ...patch };
    return clientes[idx];
  }

  async remove(id: number) {
    const idx = clientes.findIndex(c => c.id === id);
    if (idx === -1) return false;
    clientes.splice(idx, 1);
    return true;
  }
}