import { Request, Response } from 'express';
import { VentaService } from '../services/ventaService';

const service = new VentaService();

export default {
  async create(req: Request, res: Response) {
    const { client_id, items } = req.body || {};
    if (!client_id || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'client_id e items (array) son requeridos' });
    }

    try {
      const v = await service.create(Number(client_id), items);
      return res.status(201).json(v);
    } catch (err: any) {
      const status = err?.status || 500;
      const message = err?.message || 'Error al crear venta';
      const detail = err?.detail || '';
      return res.status(status).json({ error: message, detail });
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
      const v = await service.get(id);
      if (!v) return res.status(404).json({ error: 'Venta no encontrada' });
      res.json(v);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
};