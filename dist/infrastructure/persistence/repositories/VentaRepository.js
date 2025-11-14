"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VentaRepository = void 0;
class VentaRepository {
    constructor(db) {
        this.db = db;
    }
    crearVenta(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run('BEGIN TRANSACTION');
            try {
                // verify client exists
                const client = yield this.db.get('SELECT id FROM clients WHERE id = ?', [data.client_id]);
                if (!client)
                    throw new Error('Cliente no encontrado');
                // check stock and calculate subtotals
                let total = 0;
                const details = [];
                for (const p of data.products) {
                    const prod = yield this.db.get('SELECT id, price, stock FROM products WHERE id = ?', [p.product_id]);
                    if (!prod)
                        throw new Error(`Producto ${p.product_id} no encontrado`);
                    if (prod.stock < p.quantity)
                        throw new Error(`Stock insuficiente para producto ${p.product_id}`);
                    const subtotal = prod.price * p.quantity;
                    total += subtotal;
                    details.push({ product_id: p.product_id, quantity: p.quantity, subtotal });
                }
                const resultSale = yield this.db.run('INSERT INTO sales (client_id, total) VALUES (?, ?)', [data.client_id, total]);
                const saleId = resultSale.lastID;
                for (const d of details) {
                    yield this.db.run('INSERT INTO sale_details (sale_id, product_id, quantity, subtotal) VALUES (?, ?, ?, ?)', [saleId, d.product_id, d.quantity, d.subtotal]);
                    // update stock
                    yield this.db.run('UPDATE products SET stock = stock - ? WHERE id = ?', [d.quantity, d.product_id]);
                }
                yield this.db.run('COMMIT');
                return {
                    id: saleId,
                    client_id: data.client_id,
                    total,
                    details,
                    created_at: new Date()
                };
            }
            catch (err) {
                yield this.db.run('ROLLBACK');
                throw err;
            }
        });
    }
    obtenerTodas() {
        return __awaiter(this, void 0, void 0, function* () {
            // Return summary list
            return this.db.all(`
            SELECT s.id, c.name as client, s.total, date(s.created_at) as date
            FROM sales s
            JOIN clients c ON c.id = s.client_id
            ORDER BY s.created_at DESC
        `);
        });
    }
    obtenerPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sale = yield this.db.get('SELECT s.id, c.name as client, s.total, s.created_at FROM sales s JOIN clients c ON c.id = s.client_id WHERE s.id = ?', [id]);
            if (!sale)
                return null;
            const products = yield this.db.all('SELECT p.name, sd.quantity FROM sale_details sd JOIN products p ON p.id = sd.product_id WHERE sd.sale_id = ?', [id]);
            return Object.assign(Object.assign({}, sale), { products, total: sale.total });
        });
    }
    actualizarVenta(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run('BEGIN TRANSACTION');
            try {
                const sale = yield this.db.get('SELECT id FROM sales WHERE id = ?', [id]);
                if (!sale)
                    throw new Error('Venta no encontrada');
                // update client_id if provided
                if (dto.client_id !== undefined) {
                    const client = yield this.db.get('SELECT id FROM clients WHERE id = ?', [dto.client_id]);
                    if (!client)
                        throw new Error('Cliente no encontrado');
                    yield this.db.run('UPDATE sales SET client_id = ? WHERE id = ?', [dto.client_id, id]);
                }
                // if products provided, update details and adjust stock
                if (dto.products !== undefined) {
                    // get current details
                    const currentDetails = yield this.db.all('SELECT product_id, quantity FROM sale_details WHERE sale_id = ?', [id]);
                    const currentMap = new Map();
                    for (const d of currentDetails)
                        currentMap.set(d.product_id, d.quantity);
                    // build new map and validate products
                    const newMap = new Map();
                    let total = 0;
                    for (const p of dto.products) {
                        const prod = yield this.db.get('SELECT id, price, stock FROM products WHERE id = ?', [p.product_id]);
                        if (!prod)
                            throw new Error(`Producto ${p.product_id} no encontrado`);
                        newMap.set(p.product_id, p.quantity);
                        total += prod.price * p.quantity;
                    }
                    // check stock availability for increases
                    for (const [product_id, newQty] of newMap.entries()) {
                        const oldQty = currentMap.get(product_id) || 0;
                        const delta = newQty - oldQty; // positive -> need more stock
                        if (delta > 0) {
                            const prod = yield this.db.get('SELECT stock FROM products WHERE id = ?', [product_id]);
                            if (prod.stock < delta)
                                throw new Error(`Stock insuficiente para producto ${product_id}`);
                        }
                    }
                    // apply stock changes: for each product in union of keys
                    const allProductIds = new Set([...currentMap.keys(), ...newMap.keys()]);
                    for (const pid of allProductIds) {
                        const oldQty = currentMap.get(pid) || 0;
                        const newQty = newMap.get(pid) || 0;
                        const delta = newQty - oldQty;
                        // subtract delta from stock (delta may be negative -> increases stock)
                        if (delta !== 0) {
                            yield this.db.run('UPDATE products SET stock = stock - ? WHERE id = ?', [delta, pid]);
                        }
                    }
                    // replace sale_details
                    yield this.db.run('DELETE FROM sale_details WHERE sale_id = ?', [id]);
                    for (const [product_id, quantity] of newMap.entries()) {
                        const prod = yield this.db.get('SELECT price FROM products WHERE id = ?', [product_id]);
                        const subtotal = prod.price * quantity;
                        yield this.db.run('INSERT INTO sale_details (sale_id, product_id, quantity, subtotal) VALUES (?, ?, ?, ?)', [id, product_id, quantity, subtotal]);
                    }
                    // update total
                    yield this.db.run('UPDATE sales SET total = ? WHERE id = ?', [total, id]);
                }
                yield this.db.run('COMMIT');
                const updated = yield this.obtenerPorId(id);
                return updated;
            }
            catch (err) {
                yield this.db.run('ROLLBACK');
                throw err;
            }
        });
    }
    eliminarVenta(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run('BEGIN TRANSACTION');
            try {
                const sale = yield this.db.get('SELECT id FROM sales WHERE id = ?', [id]);
                if (!sale)
                    throw new Error('Venta no encontrada');
                const details = yield this.db.all('SELECT product_id, quantity FROM sale_details WHERE sale_id = ?', [id]);
                for (const d of details) {
                    yield this.db.run('UPDATE products SET stock = stock + ? WHERE id = ?', [d.quantity, d.product_id]);
                }
                yield this.db.run('DELETE FROM sale_details WHERE sale_id = ?', [id]);
                yield this.db.run('DELETE FROM sales WHERE id = ?', [id]);
                yield this.db.run('COMMIT');
            }
            catch (err) {
                yield this.db.run('ROLLBACK');
                throw err;
            }
        });
    }
}
exports.VentaRepository = VentaRepository;
