import express from 'express';
import bodyParser from 'body-parser';
import clienteRoutes from './routes/cliente.routes';

const app = express();
app.use(bodyParser.json());

// Health check
app.get('/health', (_req, res) => res.json({ status: 'OK', service: 'clientes-service' }));

app.use('/api/v1/clients', clienteRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
app.listen(PORT, () => {
  console.log(`✓ Clientes service running on http://localhost:${PORT}`);
  console.log(`  Endpoints: GET/POST /api/v1/clients | GET/PUT/DELETE /api/v1/clients/:id`);
});

export default app;