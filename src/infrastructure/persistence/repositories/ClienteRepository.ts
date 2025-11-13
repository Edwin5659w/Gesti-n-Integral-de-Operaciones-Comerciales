import { Database } from 'sqlite';
import { Cliente, CrearClienteDTO, ActualizarClienteDTO } from '../../../domain/entities/Cliente';
import { IClienteRepository } from '../../../domain/interfaces/repositories/IClienteRepository';

export class ClienteRepository implements IClienteRepository {
    constructor(private db: Database) {}

    async crear(cliente: CrearClienteDTO): Promise<Cliente> {
        const { name, email, phone } = cliente;
        const result = await this.db.run(
            'INSERT INTO clientes (name, email, phone, created_at) VALUES (?, ?, ?, ?)',
            [name, email, phone, new Date()]
        );
        const id = result.lastID!;
        return new Cliente(id, name, email, phone, new Date());
    }

    async obtenerPorId(id: number): Promise<Cliente | null> {
        const row = await this.db.get('SELECT * FROM clientes WHERE id = ?', [id]);
        return row ? new Cliente(row.id, row.name, row.email, row.phone, new Date(row.created_at)) : null;
    }

    async actualizar(id: number, cliente: ActualizarClienteDTO): Promise<Cliente> {
        const { name, email, phone } = cliente;
        await this.db.run(
            'UPDATE clientes SET name = ?, email = ?, phone = ? WHERE id = ?',
            [name, email, phone, id]
        );
        const actualizado = await this.obtenerPorId(id);
        if (!actualizado) throw new Error('Cliente no encontrado');
        return actualizado;
    }

    async eliminarCliente(id: number): Promise<void> {
        await this.db.run('DELETE FROM clientes WHERE id = ?', [id]);
    }

    async obtenerTodos(): Promise<Cliente[]> {
        const rows = await this.db.all('SELECT * FROM clientes');
        return rows.map(row => new Cliente(row.id, row.name, row.email, row.phone, new Date(row.created_at)));
    }
}