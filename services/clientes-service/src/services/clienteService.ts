import { ClienteRepository } from '../repositories/clienteRepository';
import { Cliente } from '../type/Cliente';
import { CreateClienteDTO, UpdateClienteDTO, ClienteResponseDTO } from '../dto/clienteDTO';

export class ClienteService {
  private repo = new ClienteRepository();

  async create(dto: CreateClienteDTO): Promise<ClienteResponseDTO> {
    const c = await this.repo.createCliente(dto);
    return new ClienteResponseDTO(c);
  }

  async list(): Promise<ClienteResponseDTO[]> {
    const clientes: Cliente[] = await this.repo.findAllClientes();
    return clientes.map(c => new ClienteResponseDTO(c));
  }

  async get(id: number): Promise<ClienteResponseDTO | null> {
    const cliente: Cliente | null = await this.repo.findClienteById(id);
    return cliente ? new ClienteResponseDTO(cliente) : null;
  }

  async update(dto: UpdateClienteDTO): Promise<ClienteResponseDTO | null> {
    const updated = await this.repo.updateCliente(dto.id, dto);
    return updated ? new ClienteResponseDTO(updated) : null;
  }

  async delete(id: number): Promise<boolean> {
    return await this.repo.deleteCliente(id);
  }
}
