import { Request, Response } from 'express';
import { ProductoService } from '../services/productoService';

const service = new ProductoService();

export default {
  async create(req: Request, res: Response) {
    try {
      const { nombre, precio, stock, descripcion } = req.body;
      if (!nombre || precio == null || stock == null) {
        return res.status(400).json({ error: 'nombre, precio y stock son requeridos' });
      }
      
      const p = await service.create({ nombre, precio, stock, descripcion });
      res.status(201).json(p);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async list(_req: Request, res: Response) {
    try {
      const all = await service.list();
      res.json(all);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const p = await service.get(id);
      if (!p) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json(p);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const u = await service.update(id, req.body);
      if (!u) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json(u);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const ok = await service.delete(id);
      if (!ok) return res.status(404).json({ error: 'Producto no encontrado' });
      res.status(204).send();
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async reserveStock(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { quantity } = req.body;
      if (quantity == null || quantity <= 0) {
        return res.status(400).json({ error: 'quantity debe ser > 0' });
      }
      
      const result = await service.reserveStock(id, Number(quantity));
      if (!result.ok) {
        if (result.reason === 'not_found') {
          return res.status(404).json({ error: 'Producto no encontrado' });
        }
        if (result.reason === 'insufficient_stock') {
          return res.status(409).json({ error: 'Stock insuficiente' });
        }
        return res.status(400).json({ error: 'No se pudo reservar stock' });
      }
      
      res.json({ message: 'Stock reservado', product: result.product });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
};