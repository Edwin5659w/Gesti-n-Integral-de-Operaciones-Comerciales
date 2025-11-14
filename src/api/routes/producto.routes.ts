import { Router } from 'express';
import { ProductoController } from '../controllers/productoController';
import { validateProducto } from '../middlewares/validation';

export default function createProductoRouter(controller: ProductoController) {
    const router = Router();
    // mounted at /api/products
    router.post('/', validateProducto, controller.crear);
    router.get('/', controller.obtenerTodos);
    router.get('/:id', controller.obtenerPorId);
    router.put('/:id', validateProducto, controller.actualizar);
    router.delete('/:id', controller.eliminar);
    return router;
}