import { Request, Response, NextFunction } from 'express';

export const validateCliente = (req: Request, res: Response, next: NextFunction) => {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name y email son requeridos' });
    if (typeof email !== 'string' || !email.includes('@')) return res.status(400).json({ error: 'email inválido' });
    next();
};

export const validateProducto = (req: Request, res: Response, next: NextFunction) => {
    const { name, price, stock } = req.body;
    if (!name || price === undefined || stock === undefined) return res.status(400).json({ error: 'name, price y stock son requeridos' });
    if (typeof price !== 'number' || typeof stock !== 'number') return res.status(400).json({ error: 'price y stock deben ser números' });
    next();
};