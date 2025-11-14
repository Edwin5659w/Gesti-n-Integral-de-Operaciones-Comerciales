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
exports.VentaService = void 0;
class VentaService {
    constructor(repository) {
        this.repository = repository;
    }
    crearVenta(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dto.client_id || !dto.products.length) {
                throw new Error('Se requiere ID del cliente y al menos un producto');
            }
            return this.repository.crearVenta(dto);
        });
    }
    obtenerVentas() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.obtenerTodas();
        });
    }
    obtenerVentaPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.obtenerPorId(id);
        });
    }
    actualizarVenta(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.actualizarVenta(id, dto);
        });
    }
    eliminarVenta(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.eliminarVenta(id);
        });
    }
}
exports.VentaService = VentaService;
