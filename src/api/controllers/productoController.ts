import { Request, Response } from 'express';
import { ProductoService } from '../../infrastructure/persistence/services/ProductoService';

export class ProductoController {
    constructor(private service: ProductoService) {}

    crear = async (req: Request, res: Response) => {
        try {
            const producto = await this.service.crearProducto(req.body);
            res.status(201).json(producto);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    };

    obtenerTodos = async (_req: Request, res: Response) => {
        const productos = await this.service.obtenerProductos();
        res.json(productos);
    };

    obtenerPorId = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const producto = await this.service.obtenerProductoPorId(id);
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(producto);
    };

    actualizar = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const producto = await this.service.actualizarProducto(id, req.body);
            res.json(producto);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    };
}