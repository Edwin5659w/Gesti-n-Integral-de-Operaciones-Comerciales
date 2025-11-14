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
exports.ClienteRepository = void 0;
const Cliente_1 = require("../../../domain/entities/Cliente");
class ClienteRepository {
    constructor(db) {
        this.db = db;
    }
    crear(cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, phone } = cliente;
            try {
                const result = yield this.db.run('INSERT INTO clients (name, email, phone, created_at) VALUES (?, ?, ?, ?)', [name, email, phone, new Date()]);
                const id = result.lastID;
                return new Cliente_1.Cliente(id, name, email, phone, new Date());
            }
            catch (err) {
                // Normalize unique constraint errors to a friendly message
                if (err && err.message && err.message.includes('UNIQUE')) {
                    throw new Error('Email ya registrado');
                }
                throw err;
            }
        });
    }
    obtenerPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield this.db.get('SELECT id, name, email, phone, created_at FROM clients WHERE id = ?', [id]);
            return row ? new Cliente_1.Cliente(row.id, row.name, row.email, row.phone, new Date(row.created_at)) : null;
        });
    }
    actualizar(id, cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, phone } = cliente;
            yield this.db.run('UPDATE clients SET name = ?, email = ?, phone = ? WHERE id = ?', [name, email, phone, id]);
            const actualizado = yield this.obtenerPorId(id);
            if (!actualizado)
                throw new Error('Cliente no encontrado');
            return actualizado;
        });
    }
    eliminarCliente(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run('DELETE FROM clients WHERE id = ?', [id]);
        });
    }
    obtenerTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield this.db.all('SELECT id, name, email, phone, created_at FROM clients');
            return rows.map(row => new Cliente_1.Cliente(row.id, row.name, row.email, row.phone, new Date(row.created_at)));
        });
    }
}
exports.ClienteRepository = ClienteRepository;
