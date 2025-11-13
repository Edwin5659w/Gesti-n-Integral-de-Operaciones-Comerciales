import { IClienteRepository } from '../../../domain/interfaces/repositories/IClienteRepository';
import { Cliente, CrearClienteDTO, ActualizarClienteDTO } from '../../../domain/entities/Cliente';

export class ClienteService {
    constructor(private repository: IClienteRepository) {}

    async crearCliente(dto: CrearClienteDTO): Promise<Cliente> {
        return this.repository.crear(dto);
    }

    async obtenerClientes(): Promise<Cliente[]> {
        return this.repository.obtenerTodos();
    }

    async obtenerClientePorId(id: number): Promise<Cliente | null> {
        return this.repository.obtenerPorId(id);
    }

    async actualizarCliente(id: number, dto: ActualizarClienteDTO): Promise<Cliente> {
        return this.repository.actualizar(id, dto);
    }
}