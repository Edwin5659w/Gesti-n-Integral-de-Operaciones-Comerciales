import { Database } from 'sqlite';
import { Producto, CrearProductoDTO, ActualizarProductoDTO } from '../../../domain/entities/Producto';
import { IProductoRepository } from '../../../domain/interfaces/repositories/IProductoRepository';

export class ProductoRepository implements IProductoRepository {
    constructor(private db: Database) {}

    async crear(producto: CrearProductoDTO): Promise<Producto> {
        const result: any = await this.db.run(
            'INSERT INTO products (name, price, stock) VALUES (?, ?, ?)',
            [producto.name, producto.price, producto.stock]
        );
        return { id: result.lastID, ...producto } as Producto;
    }

    async obtenerTodos(): Promise<Producto[]> {
        return this.db.all<Producto[]>('SELECT id, name, price, stock FROM products');
    }

    async obtenerPorId(id: number): Promise<Producto | null> {
        const producto = await this.db.get<Producto>('SELECT id, name, price, stock FROM products WHERE id = ?', [id]);
        return producto || null;
    }

    async actualizar(id: number, producto: ActualizarProductoDTO): Promise<Producto> {
        const fields = Object.entries(producto).filter(([_, v]) => v !== undefined);
        if (fields.length === 0) throw new Error('No hay campos para actualizar');

        const sets = fields.map(([k]) => `${k} = ?`).join(', ');
        const values = fields.map(([_, v]) => v);
        await this.db.run(`UPDATE products SET ${sets} WHERE id = ?`, [...values, id]);

        const actualizado = await this.obtenerPorId(id);
        if (!actualizado) throw new Error('Producto no encontrado');
        return actualizado;
    }

    async eliminarProducto(id: number): Promise<void> {
        await this.db.run('DELETE FROM products WHERE id = ?', [id]);
    }
}