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
}