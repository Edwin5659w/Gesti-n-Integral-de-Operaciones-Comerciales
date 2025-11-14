"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cliente_routes_1 = __importDefault(require("./api/routes/cliente.routes"));
const producto_routes_1 = __importDefault(require("./api/routes/producto.routes"));
const venta_routes_1 = __importDefault(require("./api/routes/venta.routes"));
const database_1 = __importDefault(require("./config/database"));
// Import repositories/services/controllers to wire routes
const ClienteRepository_1 = require("./infrastructure/persistence/repositories/ClienteRepository");
const ProductoRepository_1 = require("./infrastructure/persistence/repositories/ProductoRepository");
const VentaRepository_1 = require("./infrastructure/persistence/repositories/VentaRepository");
const ClienteService_1 = require("./infrastructure/persistence/services/ClienteService");
const ProductoService_1 = require("./infrastructure/persistence/services/ProductoService");
const VentaService_1 = require("./infrastructure/persistence/services/VentaService");
const clienteController_1 = require("./api/controllers/clienteController");
const productoController_1 = require("./api/controllers/productoController");
const ventaController_1 = require("./api/controllers/ventaController");
const app = (0, express_1.default)();
exports.app = app;
app.use(body_parser_1.default.json());
// Wire dependencies and mount routers
const clienteRepo = new ClienteRepository_1.ClienteRepository(database_1.default);
const productoRepo = new ProductoRepository_1.ProductoRepository(database_1.default);
const ventaRepo = new VentaRepository_1.VentaRepository(database_1.default);
const clienteService = new ClienteService_1.ClienteService(clienteRepo);
const productoService = new ProductoService_1.ProductoService(productoRepo);
const ventaService = new VentaService_1.VentaService(ventaRepo);
const clienteController = new clienteController_1.ClienteController(clienteService);
const productoController = new productoController_1.ProductoController(productoService);
const ventaController = new ventaController_1.VentaController(ventaService);
app.use('/api/v1/clients', (0, cliente_routes_1.default)(clienteController));
app.use('/api/v1/products', (0, producto_routes_1.default)(productoController));
app.use('/api/v1/sales', (0, venta_routes_1.default)(ventaController));
// Si el proyecto arrancaba el servidor aquí, lo dejamos pero también exportamos `app`.
// Esto permite ejecutar tests/colecciones sin necesidad de duplicar código.
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
exports.default = app;
