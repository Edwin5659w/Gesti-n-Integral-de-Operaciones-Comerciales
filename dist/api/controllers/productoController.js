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
exports.ProductoController = void 0;
class ProductoController {
    constructor(service) {
        this.service = service;
        this.crear = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const producto = yield this.service.crearProducto(req.body);
                res.status(201).json(producto);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
        this.obtenerTodos = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            const productos = yield this.service.obtenerProductos();
            res.type('application/json');
            res.json(productos);
        });
        this.obtenerPorId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const producto = yield this.service.obtenerProductoPorId(id);
            if (!producto)
                return res.status(404).json({ error: 'Producto no encontrado' });
            res.type('application/json');
            res.json(producto);
        });
        this.actualizar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const producto = yield this.service.actualizarProducto(id, req.body);
                res.type('application/json');
                res.json(producto);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
        this.eliminar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                yield this.service.eliminarProducto(id);
                res.status(204).send();
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    }
}
exports.ProductoController = ProductoController;
