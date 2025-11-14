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
exports.VentaController = void 0;
class VentaController {
    constructor(service) {
        this.service = service;
        this.crear = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const venta = yield this.service.crearVenta(req.body);
                res.status(201).json(venta);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
        this.obtenerTodas = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            const ventas = yield this.service.obtenerVentas();
            res.type('application/json');
            res.json(ventas);
        });
        this.obtenerPorId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const venta = yield this.service.obtenerVentaPorId(id);
            if (!venta)
                return res.status(404).json({ error: 'Venta no encontrada' });
            res.type('application/json');
            res.json(venta);
        });
        this.actualizar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const dto = req.body;
                const updated = yield this.service.actualizarVenta(id, dto);
                res.type('application/json');
                res.json(updated);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
        this.eliminar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                yield this.service.eliminarVenta(id);
                res.status(204).send();
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    }
}
exports.VentaController = VentaController;
