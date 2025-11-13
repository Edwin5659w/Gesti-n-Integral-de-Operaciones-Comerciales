import { Request, Response } from 'express';
import { ClienteService } from '../../infrastructure/persistence/services/ClienteService';

export class ClienteController {
    constructor(private clienteService: ClienteService) {}

    async crear(req: Request, res: Response) {
        try {
            const cliente = await this.clienteService.crearCliente(req.body);
            res.status(201).json(cliente);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async obtenerTodos(req: Request, res: Response) {
        try {
            const clientes = await this.clienteService.obtenerClientes();
            res.json(clientes);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async obtenerPorId(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const cliente = await this.clienteService.obtenerClientePorId(id);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }
            res.json(cliente);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async actualizar(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const cliente = await this.clienteService.actualizarCliente(id, req.body);
            res.json(cliente);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}