import express from 'express';
import clienteController from './controllers/clienteController'
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();
app.use(express.json());
const swaggerDocument = YAML.load('./docs/api/clientes.yaml');

// Health check
app.get('/health', (_req, res) => res.json({ status: 'OK', service: 'clientes-service' }));

app.use('/api/v1/clients', swaggerUi.serve, swaggerUi.setup(swaggerDocument), clienteController);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
app.listen(PORT, () => {
  console.log(`✓ Clientes service running on http://localhost:${PORT}`);
  console.log(`  Endpoints: GET/POST /api/v1/clients | GET/PUT/DELETE /api/v1/clients/:id`);
});

export default app;