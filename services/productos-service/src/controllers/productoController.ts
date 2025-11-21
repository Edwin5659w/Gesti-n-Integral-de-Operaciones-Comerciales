import { Router, Request, Response } from 'express';
import { ProductoService } from '../services/productoService';
import { CreateProductoDTO, UpdateProductoDTO } from '../dto/productDTO'

const service = new ProductoService();
const router = Router();


router.get('/', async (req: Request, res: Response) => {
  try {
    const product = await service.list();
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get shirt by ID
router.get('/:id', async (req: Request, res: Response)  => {
  try {
    const id = parseInt(req.params.id, 10);
    const shirt = await service.get(id);
    if (!shirt) {
      return res.status(404).json({ message: 'Shirt not found' });
    }
    res.json(shirt);
  } catch (error) {
    console.error('Error fetching shirt:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new shirt
router.post('/', async (req: Request, res: Response)  => {
  try {
    const dto = new CreateProductoDTO(req.body); // Validate and transform input data
    const newShirt = await service.create(dto);
    res.status(201).json(newShirt);
  } catch (error) {
    console.error('Error creating shirt:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update an existing shirt
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const dto = new UpdateProductoDTO({ id, ...req.body}); // Valida y transforma la data, además valida que el id venga en los parametros y permite a los demas datos ser opcionales
    const update = await service.update(dto);
    if (!update) {
        return res.status(404).json({ message: 'Shirt not found' });
    }
    res.json(update);
  } catch (error) {
    console.error('Error updating shirt:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a shirt
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const success = await service.delete(id);
    if (!success) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting shirt:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;