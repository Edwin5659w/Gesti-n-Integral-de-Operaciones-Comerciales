"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createProductoRouter;
const express_1 = require("express");
const validation_1 = require("../middlewares/validation");
function createProductoRouter(controller) {
    const router = (0, express_1.Router)();
    // mounted at /api/products
    router.post('/', validation_1.validateProducto, controller.crear);
    router.get('/', controller.obtenerTodos);
    router.get('/:id', controller.obtenerPorId);
    router.put('/:id', validation_1.validateProducto, controller.actualizar);
    router.delete('/:id', controller.eliminar);
    return router;
}
