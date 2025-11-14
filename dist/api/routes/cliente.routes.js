"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createClienteRouter;
const express_1 = require("express");
const validation_1 = require("../middlewares/validation");
function createClienteRouter(controller) {
    const router = (0, express_1.Router)();
    // Ruta para crear un nuevo cliente (mounted at /api/clients)
    router.post('/', validation_1.validateCliente, controller.crear);
    // Ruta para listar todos los clientes
    router.get('/', controller.obtenerTodos);
    // Ruta para obtener un cliente por su ID
    router.get('/:id', controller.obtenerPorId);
    // Ruta para actualizar un cliente existente
    router.put('/:id', validation_1.validateCliente, controller.actualizar);
    // Ruta para eliminar un cliente
    router.delete('/:id', controller.eliminar);
    return router;
}
