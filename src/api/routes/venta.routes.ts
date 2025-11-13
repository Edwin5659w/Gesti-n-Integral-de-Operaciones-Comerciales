import { Router } from 'express';
import { VentaController } from '../controllers/ventaController';

export default function createVentaRouter(controller: VentaController) {
    const router = Router();
    router.post('/sales', controller.crear);
    router.get('/sales', controller.obtenerTodas);
    router.get('/sales/:id', controller.obtenerPorId);
    return router;
}