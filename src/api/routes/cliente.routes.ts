import { Router } from 'express';
import { ClienteController } from '../controllers/clienteController';
import { validateCliente } from '../middlewares/validation';

export default function createClienteRouter(controller: ClienteController) {
    const router = Router();

    // Ruta para crear un nuevo cliente
    router.post('/clients', validateCliente, controller.crear);

    // Ruta para listar todos los clientes
    router.get('/clients', controller.obtenerTodos);

    // Ruta para obtener un cliente por su ID
    router.get('/clients/:id', controller.obtenerPorId);

    // Ruta para actualizar un cliente existente
    router.put('/clients/:id', validateCliente, controller.actualizar);

    return router;
}