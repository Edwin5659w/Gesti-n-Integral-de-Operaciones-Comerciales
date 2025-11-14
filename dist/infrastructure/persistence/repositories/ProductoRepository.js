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
exports.ProductoRepository = void 0;
class ProductoRepository {
    constructor(db) {
        this.db = db;
    }
    crear(producto) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.run('INSERT INTO products (name, price, stock) VALUES (?, ?, ?)', [producto.name, producto.price, producto.stock]);
            return Object.assign({ id: result.lastID }, producto);
        });
    }
    obtenerTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.all('SELECT id, name, price, stock FROM products');
        });
    }
    obtenerPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const producto = yield this.db.get('SELECT id, name, price, stock FROM products WHERE id = ?', [id]);
            return producto || null;
        });
    }
    actualizar(id, producto) {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = Object.entries(producto).filter(([_, v]) => v !== undefined);
            if (fields.length === 0)
                throw new Error('No hay campos para actualizar');
            const sets = fields.map(([k]) => `${k} = ?`).join(', ');
            const values = fields.map(([_, v]) => v);
            yield this.db.run(`UPDATE products SET ${sets} WHERE id = ?`, [...values, id]);
            const actualizado = yield this.obtenerPorId(id);
            if (!actualizado)
                throw new Error('Producto no encontrado');
            return actualizado;
        });
    }
    eliminarProducto(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run('DELETE FROM products WHERE id = ?', [id]);
        });
    }
}
exports.ProductoRepository = ProductoRepository;
