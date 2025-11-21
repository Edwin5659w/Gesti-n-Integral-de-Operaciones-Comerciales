import { Router, Request, Response } from 'express';
import { ClienteService } from '../services/clienteService';
import { CreateClienteDTO, UpdateClienteDTO } from '../dto/clienteDTO';

const service = new ClienteService();
const router = Router();

// Listar todos los clientes
router.get('/', async (req: Request, res: Response) => {
  try {
    const clientes = await service.list();
    res.json(clientes);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Obtener cliente por ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const cliente = await service.get(id);
    if (!cliente) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(cliente);
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Crear un nuevo cliente
router.post('/', async (req: Request, res: Response) => {
  try {
    const dto = new CreateClienteDTO(req.body); // Valida y transforma la data
    const newCliente = await service.create(dto);
    res.status(201).json(newCliente);
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Actualizar un cliente existente
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const dto = new UpdateClienteDTO({ id, ...req.body }); 
    const update = await service.update(dto);
    if (!update) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(update);
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Eliminar un cliente
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const success = await service.delete(id);
    if (!success) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
