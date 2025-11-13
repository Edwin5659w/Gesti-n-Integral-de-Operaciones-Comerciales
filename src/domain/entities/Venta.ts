// src/domain/entities/Venta.ts

export class Venta {
    constructor(
        public id: number,
        public client_id: number,
        public total: number,
        public details: VentaDetalle[],
        public created_at: Date
    ) {}
}

export interface VentaDetalle {
    product_id: number;
    quantity: number;
    subtotal: number;
}

export interface CrearVentaDTO {
    client_id: number;
    products: {
        product_id: number;
        quantity: number;
    }[];
}