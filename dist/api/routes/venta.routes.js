"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createVentaRouter;
const express_1 = require("express");
function createVentaRouter(controller) {
    const router = (0, express_1.Router)();
    // mounted at /api/sales
    router.post('/', controller.crear);
    router.get('/', controller.obtenerTodas);
    router.get('/:id', controller.obtenerPorId);
    router.put('/:id', controller.actualizar);
    router.delete('/:id', controller.eliminar);
    return router;
}
