import { Request, Response } from 'express';
import { ClienteService } from '../services/clienteService';

const service = new ClienteService();

export default {
  async create(req: Request, res: Response) {
    try {
      const { nombre, email, telefono } = req.body;
      if (!nombre) return res.status(400).json({ error: 'nombre es requerido' });
      
      const c = await service.create({ nombre, email, telefono });
      res.status(201).json(c);
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
      const c = await service.get(id);
      if (!c) return res.status(404).json({ error: 'Cliente no encontrado' });
      res.json(c);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const updated = await service.update(id, req.body);
      if (!updated) return res.status(404).json({ error: 'Cliente no encontrado' });
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const ok = await service.delete(id);
      if (!ok) return res.status(404).json({ error: 'Cliente no encontrado' });
      res.status(204).send();
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
};