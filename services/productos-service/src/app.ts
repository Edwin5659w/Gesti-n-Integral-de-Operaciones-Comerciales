import express from 'express';
import productoController from './controllers/productoController'
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();
app.use(express.json());
const swaggerDocument = YAML.load('./docs/api/productos.yaml');

// Health check
app.get('/health', (_req, res) => res.json({ status: 'OK', service: 'productos-service' }));

app.use('/api/v1/products', productoController);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const PORT = process.env.PORT ? Number(process.env.PORT) : 3002;
app.listen(PORT, () => {
  console.log(`✓ Productos service running on http://localhost:${PORT}`);
  console.log(`  Endpoints:`);
  console.log(`    GET    /api/v1/products`);
  console.log(`    POST   /api/v1/products`);
  console.log(`    GET    /api/v1/products/:id`);
  console.log(`  Swagger docs: http://localhost:${PORT}/api-docs`);
  
});

export default app;