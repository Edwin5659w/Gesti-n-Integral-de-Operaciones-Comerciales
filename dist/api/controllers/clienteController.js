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
exports.ClienteController = void 0;
class ClienteController {
    constructor(clienteService) {
        this.clienteService = clienteService;
        this.crear = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cliente = yield this.clienteService.crearCliente(req.body);
                res.status(201).json(cliente);
            }
            catch (error) {
                const msg = error.message || '';
                if (msg.includes('Email') || msg.includes('registrado') || msg.includes('UNIQUE')) {
                    return res.status(400).json({ error: msg });
                }
                res.status(500).json({ error: msg });
            }
        });
        this.obtenerTodos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const clientes = yield this.clienteService.obtenerClientes();
                res.type('application/json');
                res.json(clientes);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.obtenerPorId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const cliente = yield this.clienteService.obtenerClientePorId(id);
                if (!cliente) {
                    return res.status(404).json({ error: 'Cliente no encontrado' });
                }
                res.type('application/json');
                res.json(cliente);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.actualizar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const cliente = yield this.clienteService.actualizarCliente(id, req.body);
                res.type('application/json');
                res.json(cliente);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.eliminar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                yield this.clienteService.eliminarCliente(id);
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.ClienteController = ClienteController;
