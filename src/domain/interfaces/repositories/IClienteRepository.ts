import { Cliente, CrearClienteDTO, ActualizarClienteDTO } from '../../entities/Cliente';

export interface IClienteRepository {
    crear(cliente: CrearClienteDTO): Promise<Cliente>;
    obtenerTodos(): Promise<Cliente[]>;
    obtenerPorId(id: number): Promise<Cliente | null>;
    actualizar(id: number, cliente: ActualizarClienteDTO): Promise<Cliente>;
    eliminarCliente(id: number): Promise<void>;
}