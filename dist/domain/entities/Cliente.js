"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
class Cliente {
    constructor(id, name, email, phone, created_at) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.created_at = created_at;
    }
}
exports.Cliente = Cliente;
