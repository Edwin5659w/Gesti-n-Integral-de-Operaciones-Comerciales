import { Router } from 'express';
import { ClienteController } from '../controllers/clienteController';
import { validateCliente } from '../middlewares/validation';

export default function createClienteRouter(controller: ClienteController) {
    const router = Router();

    // Ruta para crear un nuevo cliente (mounted at /api/clients)
    router.post('/', validateCliente, controller.crear);

    // Ruta para listar todos los clientes
    router.get('/', controller.obtenerTodos);

    // Ruta para obtener un cliente por su ID
    router.get('/:id', controller.obtenerPorId);

    // Ruta para actualizar un cliente existente
    router.put('/:id', validateCliente, controller.actualizar);

    // Ruta para eliminar un cliente
    router.delete('/:id', controller.eliminar);

    return router;
}