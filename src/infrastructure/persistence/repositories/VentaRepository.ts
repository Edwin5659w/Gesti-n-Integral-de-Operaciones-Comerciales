import { Database } from 'sqlite';
import { Venta, CrearVentaDTO, VentaDetalle } from '../../../domain/entities/Venta';
import { IVentaRepository } from '../../../domain/interfaces/repositories/IVentaRepository';

export class VentaRepository implements IVentaRepository {
    constructor(private db: Database) {}

    async crearVenta(data: CrearVentaDTO): Promise<Venta> {
        await this.db.run('BEGIN TRANSACTION');
        try {
            // verify client exists
            const client = await this.db.get('SELECT id FROM clients WHERE id = ?', [data.client_id]);
            if (!client) throw new Error('Cliente no encontrado');

            // check stock and calculate subtotals
            let total = 0;
            const details: VentaDetalle[] = [];

            for (const p of data.products) {
                const prod: any = await this.db.get('SELECT id, price, stock FROM products WHERE id = ?', [p.product_id]);
                if (!prod) throw new Error(`Producto ${p.product_id} no encontrado`);
                if (prod.stock < p.quantity) throw new Error(`Stock insuficiente para producto ${p.product_id}`);

                const subtotal = prod.price * p.quantity;
                total += subtotal;
                details.push({ product_id: p.product_id, quantity: p.quantity, subtotal });
            }

            const resultSale: any = await this.db.run(
                'INSERT INTO sales (client_id, total) VALUES (?, ?)',
                [data.client_id, total]
            );
            const saleId = resultSale.lastID;

            for (const d of details) {
                await this.db.run(
                    'INSERT INTO sale_details (sale_id, product_id, quantity, subtotal) VALUES (?, ?, ?, ?)',
                    [saleId, d.product_id, d.quantity, d.subtotal]
                );
                // update stock
                await this.db.run(
                    'UPDATE products SET stock = stock - ? WHERE id = ?',
                    [d.quantity, d.product_id]
                );
            }

            await this.db.run('COMMIT');

            return {
                id: saleId,
                client_id: data.client_id,
                total,
                details,
                created_at: new Date()
            } as Venta;
        } catch (err) {
            await this.db.run('ROLLBACK');
            throw err;
        }
    }

    async obtenerTodas(): Promise<any[]> {
        // Return summary list
        return this.db.all(`
            SELECT s.id, c.name as client, s.total, date(s.created_at) as date
            FROM sales s
            JOIN clients c ON c.id = s.client_id
            ORDER BY s.created_at DESC
        `);
    }

    async obtenerPorId(id: number): Promise<any | null> {
        const sale = await this.db.get('SELECT s.id, c.name as client, s.total, s.created_at FROM sales s JOIN clients c ON c.id = s.client_id WHERE s.id = ?', [id]);
        if (!sale) return null;
        const products = await this.db.all('SELECT p.name, sd.quantity FROM sale_details sd JOIN products p ON p.id = sd.product_id WHERE sd.sale_id = ?', [id]);
        return { ...sale, products, total: sale.total };
    }

    async actualizarVenta(id: number, dto: { client_id?: number; products?: { product_id: number; quantity: number }[] }): Promise<any> {
        await this.db.run('BEGIN TRANSACTION');
        try {
            const sale = await this.db.get('SELECT id FROM sales WHERE id = ?', [id]);
            if (!sale) throw new Error('Venta no encontrada');

            // update client_id if provided
            if (dto.client_id !== undefined) {
                const client = await this.db.get('SELECT id FROM clients WHERE id = ?', [dto.client_id]);
                if (!client) throw new Error('Cliente no encontrado');
                await this.db.run('UPDATE sales SET client_id = ? WHERE id = ?', [dto.client_id, id]);
            }

            // if products provided, update details and adjust stock
            if (dto.products !== undefined) {
                // get current details
                const currentDetails: { product_id: number; quantity: number }[] = await this.db.all(
                    'SELECT product_id, quantity FROM sale_details WHERE sale_id = ?', [id]
                );
                const currentMap = new Map<number, number>();
                for (const d of currentDetails) currentMap.set(d.product_id, d.quantity);

                // build new map and validate products
                const newMap = new Map<number, number>();
                let total = 0;
                for (const p of dto.products) {
                    const prod: any = await this.db.get('SELECT id, price, stock FROM products WHERE id = ?', [p.product_id]);
                    if (!prod) throw new Error(`Producto ${p.product_id} no encontrado`);
                    newMap.set(p.product_id, p.quantity);
                    total += prod.price * p.quantity;
                }

                // check stock availability for increases
                for (const [product_id, newQty] of newMap.entries()) {
                    const oldQty = currentMap.get(product_id) || 0;
                    const delta = newQty - oldQty; // positive -> need more stock
                    if (delta > 0) {
                        const prod: any = await this.db.get('SELECT stock FROM products WHERE id = ?', [product_id]);
                        if (prod.stock < delta) throw new Error(`Stock insuficiente para producto ${product_id}`);
                    }
                }

                // apply stock changes: for each product in union of keys
                const allProductIds = new Set<number>([...currentMap.keys(), ...newMap.keys()]);
                for (const pid of allProductIds) {
                    const oldQty = currentMap.get(pid) || 0;
                    const newQty = newMap.get(pid) || 0;
                    const delta = newQty - oldQty;
                    // subtract delta from stock (delta may be negative -> increases stock)
                    if (delta !== 0) {
                        await this.db.run('UPDATE products SET stock = stock - ? WHERE id = ?', [delta, pid]);
                    }
                }

                // replace sale_details
                await this.db.run('DELETE FROM sale_details WHERE sale_id = ?', [id]);
                for (const [product_id, quantity] of newMap.entries()) {
                    const prod: any = await this.db.get('SELECT price FROM products WHERE id = ?', [product_id]);
                    const subtotal = prod.price * quantity;
                    await this.db.run('INSERT INTO sale_details (sale_id, product_id, quantity, subtotal) VALUES (?, ?, ?, ?)', [id, product_id, quantity, subtotal]);
                }

                // update total
                await this.db.run('UPDATE sales SET total = ? WHERE id = ?', [total, id]);
            }

            await this.db.run('COMMIT');
            const updated = await this.obtenerPorId(id);
            return updated;
        } catch (err) {
            await this.db.run('ROLLBACK');
            throw err;
        }
    }

    async eliminarVenta(id: number): Promise<void> {
        await this.db.run('BEGIN TRANSACTION');
        try {
            const sale = await this.db.get('SELECT id FROM sales WHERE id = ?', [id]);
            if (!sale) throw new Error('Venta no encontrada');

            const details: any[] = await this.db.all('SELECT product_id, quantity FROM sale_details WHERE sale_id = ?', [id]);
            for (const d of details) {
                await this.db.run('UPDATE products SET stock = stock + ? WHERE id = ?', [d.quantity, d.product_id]);
            }

            await this.db.run('DELETE FROM sale_details WHERE sale_id = ?', [id]);
            await this.db.run('DELETE FROM sales WHERE id = ?', [id]);

            await this.db.run('COMMIT');
        } catch (err) {
            await this.db.run('ROLLBACK');
            throw err;
        }
    }
}