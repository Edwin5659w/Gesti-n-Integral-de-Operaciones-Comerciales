// src/repositories/clienteRepository.ts
import { Cliente } from "../type/Cliente";
import { ClienteModel } from "../models/clienteModel";

export class ClienteRepository {
  async findAllClientes(): Promise<Cliente[]> {
    const clientes = await ClienteModel.findAll();
    return clientes.map(c => c.toJSON() as Cliente);
  }

  async findClienteById(id: number): Promise<Cliente | null> {
    const cliente = await ClienteModel.findByPk(id);
    return cliente ? (cliente.toJSON() as Cliente) : null;
  }

  async createCliente(data: Omit<Cliente, "id" | "created_at">): Promise<Cliente> {
    const newCliente = await ClienteModel.create(data);
    return newCliente.toJSON() as Cliente;
  }

  async updateCliente(id: number, data: Partial<Cliente>): Promise<Cliente | null> {
    const cliente = await ClienteModel.findByPk(id);
    if (!cliente) return null;
    await cliente.update(data);
    return cliente.toJSON() as Cliente;
  }

  async deleteCliente(id: number): Promise<boolean> {
    const deleted = await ClienteModel.destroy({ where: { id } });
    return deleted > 0;
  }
}
