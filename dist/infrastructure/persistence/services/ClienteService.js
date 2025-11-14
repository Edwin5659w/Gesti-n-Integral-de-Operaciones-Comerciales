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
exports.ClienteService = void 0;
class ClienteService {
    constructor(repository) {
        this.repository = repository;
    }
    crearCliente(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.crear(dto);
        });
    }
    obtenerClientes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.obtenerTodos();
        });
    }
    obtenerClientePorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.obtenerPorId(id);
        });
    }
    actualizarCliente(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.actualizar(id, dto);
        });
    }
    eliminarCliente(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.eliminarCliente(id);
        });
    }
}
exports.ClienteService = ClienteService;
