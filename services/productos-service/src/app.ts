import express from 'express';
import bodyParser from 'body-parser';
import productoRoutes from './routes/producto.routes';

const app = express();
app.use(bodyParser.json());

// Health check
app.get('/health', (_req, res) => res.json({ status: 'OK', service: 'productos-service' }));

app.use('/api/v1/products', productoRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3002;
app.listen(PORT, () => {
  console.log(`✓ Productos service running on http://localhost:${PORT}`);
  console.log(`  Endpoints: GET/POST /api/v1/products | GET/PUT/DELETE /api/v1/products/:id`);
  console.log(`  Reserve: POST /api/v1/products/:id/reserve`);
});

export default app;