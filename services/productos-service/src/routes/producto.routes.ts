import { Router } from 'express';
import controller from '../controllers/productoController';

const router = Router();

router.post('/', controller.create);
router.get('/', controller.list);
router.get('/:id', controller.get);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.post('/:id/reserve', controller.reserveStock);

export default router;