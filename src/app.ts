import express from 'express';
import bodyParser from 'body-parser';
import clienteRoutes from './api/routes/cliente.routes';
import productoRoutes from './api/routes/producto.routes';
import ventaRoutes from './api/routes/venta.routes';
import db from './config/database';

const app = express();

app.use(bodyParser.json());
app.use('/api/clients', clienteRoutes);
app.use('/api/products', productoRoutes);
app.use('/api/sales', ventaRoutes);

// Si el proyecto arrancaba el servidor aquí, lo dejamos pero también exportamos `app`.
// Esto permite ejecutar tests/colecciones sin necesidad de duplicar código.

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Exportar app y server (server opcional) para pruebas
export { app };
export default app;