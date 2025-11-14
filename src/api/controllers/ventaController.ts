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
        res.type('application/json');
        res.json(ventas);
    };

    obtenerPorId = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const venta = await this.service.obtenerVentaPorId(id);
        if (!venta) return res.status(404).json({ error: 'Venta no encontrada' });
        res.type('application/json');
        res.json(venta);
    };

    actualizar = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const dto = req.body as { client_id?: number; products?: { product_id: number; quantity: number }[] };
            const updated = await this.service.actualizarVenta(id, dto);
            res.type('application/json');
            res.json(updated);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    };

    eliminar = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            await this.service.eliminarVenta(id);
            res.status(204).send();
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    };
}