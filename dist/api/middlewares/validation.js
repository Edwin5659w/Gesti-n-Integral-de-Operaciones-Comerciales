"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProducto = exports.validateCliente = void 0;
const validateCliente = (req, res, next) => {
    const { name, email } = req.body;
    if (!name || !email)
        return res.status(400).json({ error: 'name y email son requeridos' });
    if (typeof email !== 'string' || !email.includes('@'))
        return res.status(400).json({ error: 'email inválido' });
    next();
};
exports.validateCliente = validateCliente;
const validateProducto = (req, res, next) => {
    const { name, price, stock } = req.body;
    if (!name || price === undefined || stock === undefined)
        return res.status(400).json({ error: 'name, price y stock son requeridos' });
    if (typeof price !== 'number' || typeof stock !== 'number')
        return res.status(400).json({ error: 'price y stock deben ser números' });
    next();
};
exports.validateProducto = validateProducto;
