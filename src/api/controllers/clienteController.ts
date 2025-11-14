import { Request, Response } from 'express';
import { ClienteService } from '../../infrastructure/persistence/services/ClienteService';

export class ClienteController {
    constructor(private clienteService: ClienteService) {}

    crear = async (req: Request, res: Response) => {
        try {
            const cliente = await this.clienteService.crearCliente(req.body);
            res.status(201).json(cliente);
        } catch (error) {
            const msg = (error as Error).message || '';
            if (msg.includes('Email') || msg.includes('registrado') || msg.includes('UNIQUE')) {
                return res.status(400).json({ error: msg });
            }
            res.status(500).json({ error: msg });
        }
    };

    obtenerTodos = async (req: Request, res: Response) => {
        try {
            const clientes = await this.clienteService.obtenerClientes();
            res.type('application/json');
            res.json(clientes);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    };

    obtenerPorId = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const cliente = await this.clienteService.obtenerClientePorId(id);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }
            res.type('application/json');
            res.json(cliente);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    };

    actualizar = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const cliente = await this.clienteService.actualizarCliente(id, req.body);
            res.type('application/json');
            res.json(cliente);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    };

    eliminar = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            await this.clienteService.eliminarCliente(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    };
}