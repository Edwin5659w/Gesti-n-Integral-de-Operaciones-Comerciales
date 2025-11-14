import express from 'express';
import bodyParser from 'body-parser';

import clienteRoutes from './api/routes/cliente.routes';
import productoRoutes from './api/routes/producto.routes';
import ventaRoutes from './api/routes/venta.routes';
import db from './config/database';

// Import repositories/services/controllers to wire routes
import { ClienteRepository } from './infrastructure/persistence/repositories/ClienteRepository';
import { ProductoRepository } from './infrastructure/persistence/repositories/ProductoRepository';
import { VentaRepository } from './infrastructure/persistence/repositories/VentaRepository';
import { ClienteService } from './infrastructure/persistence/services/ClienteService';
import { ProductoService } from './infrastructure/persistence/services/ProductoService';
import { VentaService } from './infrastructure/persistence/services/VentaService';
import { ClienteController } from './api/controllers/clienteController';
import { ProductoController } from './api/controllers/productoController';
import { VentaController } from './api/controllers/ventaController';

const app = express();

app.use(bodyParser.json());

// Wire dependencies and mount routers
const clienteRepo = new ClienteRepository(db as any);
const productoRepo = new ProductoRepository(db as any);
const ventaRepo = new VentaRepository(db as any);

const clienteService = new ClienteService(clienteRepo);
const productoService = new ProductoService(productoRepo);
const ventaService = new VentaService(ventaRepo);

const clienteController = new ClienteController(clienteService);
const productoController = new ProductoController(productoService);
const ventaController = new VentaController(ventaService);

app.use('/api/v1/clients', clienteRoutes(clienteController));
app.use('/api/v1/products', productoRoutes(productoController));
app.use('/api/v1/sales', ventaRoutes(ventaController));

// Si el proyecto arrancaba el servidor aquí, lo dejamos pero también exportamos `app`.
// Esto permite ejecutar tests/colecciones sin necesidad de duplicar código.

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Exportar app y server (server opcional) para pruebas
export { app };
export default app;