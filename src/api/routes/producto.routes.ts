import { Router } from 'express';
import { ProductoController } from '../controllers/productoController';
import { validateProducto } from '../middlewares/validation';

export default function createProductoRouter(controller: ProductoController) {
    const router = Router();
    router.post('/products', validateProducto, controller.crear);
    router.get('/products', controller.obtenerTodos);
    router.get('/products/:id', controller.obtenerPorId);
    router.put('/products/:id', validateProducto, controller.actualizar);
    return router;
}