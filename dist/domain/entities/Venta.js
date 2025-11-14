"use strict";
// src/domain/entities/Venta.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venta = void 0;
class Venta {
    constructor(id, client_id, total, details, created_at) {
        this.id = id;
        this.client_id = client_id;
        this.total = total;
        this.details = details;
        this.created_at = created_at;
    }
}
exports.Venta = Venta;
