import { Database } from 'sqlite';
import { Cliente, CrearClienteDTO, ActualizarClienteDTO } from '../../../domain/entities/Cliente';
import { IClienteRepository } from '../../../domain/interfaces/repositories/IClienteRepository';

export class ClienteRepository implements IClienteRepository {
    constructor(private db: Database) {}

    async crear(cliente: CrearClienteDTO): Promise<Cliente> {
        const { name, email, phone } = cliente;
        try {
            const result = await this.db.run(
                'INSERT INTO clients (name, email, phone, created_at) VALUES (?, ?, ?, ?)',
                [name, email, phone, new Date()]
            );
            const id = result.lastID!;
            return new Cliente(id, name, email, phone, new Date());
        } catch (err: any) {
            // Normalize unique constraint errors to a friendly message
            if (err && err.message && err.message.includes('UNIQUE')) {
                throw new Error('Email ya registrado');
            }
            throw err;
        }
    }

    async obtenerPorId(id: number): Promise<Cliente | null> {
        const row = await this.db.get('SELECT id, name, email, phone, created_at FROM clients WHERE id = ?', [id]);
        return row ? new Cliente(row.id, row.name, row.email, row.phone, new Date(row.created_at)) : null;
    }

    async actualizar(id: number, cliente: ActualizarClienteDTO): Promise<Cliente> {
        const { name, email, phone } = cliente;
        await this.db.run(
            'UPDATE clients SET name = ?, email = ?, phone = ? WHERE id = ?',
            [name, email, phone, id]
        );
        const actualizado = await this.obtenerPorId(id);
        if (!actualizado) throw new Error('Cliente no encontrado');
        return actualizado;
    }

    async eliminarCliente(id: number): Promise<void> {
        await this.db.run('DELETE FROM clients WHERE id = ?', [id]);
    }

    async obtenerTodos(): Promise<Cliente[]> {
        const rows = await this.db.all('SELECT id, name, email, phone, created_at FROM clients');
        return rows.map(row => new Cliente(row.id, row.name, row.email, row.phone, new Date(row.created_at)));
    }
}