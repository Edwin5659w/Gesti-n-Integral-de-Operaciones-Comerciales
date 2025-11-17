import express from 'express';
import bodyParser from 'body-parser';
import ventaRoutes from './routes/venta.routes';

const app = express();
app.use(bodyParser.json());

// Health check
app.get('/health', (_req, res) => res.json({ status: 'OK', service: 'ventas-service' }));

app.use('/api/v1/sales', ventaRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3003;
app.listen(PORT, () => {
  console.log(`✓ Ventas service running on http://localhost:${PORT}`);
  console.log(`  Endpoints: GET/POST /api/v1/sales | GET /api/v1/sales/:id`);
  console.log(`  Comunica con: clientes (3001) y productos (3002)`);
});

export default app;