import { Cliente } from '../type/Cliente';

// DTO para crear un cliente
export class CreateClienteDTO {
  nombre: string;
  email?: string;
  telefono?: string;

  constructor(cliente: Omit<Cliente, 'id' | 'created_at'>) {
    this.nombre = cliente.nombre;
    this.email = cliente.email;
    this.telefono = cliente.telefono;
  }
}

// DTO para actualizar un cliente
export class UpdateClienteDTO {
  id!: number;
  nombre?: string;
  email?: string;
  telefono?: string;

  constructor(cliente: Partial<Omit<Cliente, 'created_at'> & { id: number }>) {
    this.id = cliente.id!;
    if (cliente.nombre !== undefined) this.nombre = cliente.nombre;
    if (cliente.email !== undefined) this.email = cliente.email;
    if (cliente.telefono !== undefined) this.telefono = cliente.telefono;
  }
}

// DTO para respuesta al cliente
export class ClienteResponseDTO {
  nombre: string;
  email?: string;
  telefono?: string;

  constructor(cliente: Cliente) {
    this.nombre = cliente.nombre;
    this.email = cliente.email;
    this.telefono = cliente.telefono;
  }
}
