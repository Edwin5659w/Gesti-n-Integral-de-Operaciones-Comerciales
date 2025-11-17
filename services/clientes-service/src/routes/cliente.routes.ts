import { Router } from 'express';
import controller from '../controllers/clienteController';

const router = Router();

router.post('/', controller.create);
router.get('/', controller.list);
router.get('/:id', controller.get);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;