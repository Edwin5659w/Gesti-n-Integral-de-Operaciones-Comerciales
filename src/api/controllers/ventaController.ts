import { Request, Response } from 'express';
import { VentaService } from '../../infrastructure/persistence/services/VentaService';

export class VentaController {
    constructor(private service: VentaService) {}

    crear = async (req: Request, res: Response) => {
        try {
            const venta = await this.service.crearVenta(req.body);
            res.status(201).json(venta);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    };

    obtenerTodas = async (_req: Request, res: Response) => {
        const ventas = await this.service.obtenerVentas();
        res.json(ventas);
    };

    obtenerPorId = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const venta = await this.service.obtenerVentaPorId(id);
        if (!venta) return res.status(404).json({ error: 'Venta no encontrada' });
        res.json(venta);
    };
}