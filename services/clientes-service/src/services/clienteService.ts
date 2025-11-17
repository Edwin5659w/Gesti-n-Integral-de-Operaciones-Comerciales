import { ClienteRepository } from '../repositories/clienteRepository';
import { Cliente } from '../models/Cliente';

export class ClienteService {
  repo = new ClienteRepository();

  async create(data: Omit<Cliente, 'id' | 'created_at'>) {
    return this.repo.create(data);
  }

  async list() {
    return this.repo.findAll();
  }

  async get(id: number) {
    return this.repo.findById(id);
  }

  async update(id: number, patch: Partial<Cliente>) {
    return this.repo.update(id, patch);
  }

  async delete(id: number) {
    return this.repo.remove(id);
  }
}