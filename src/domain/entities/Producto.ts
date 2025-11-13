export class Producto {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public stock: number
    ) {}
}

export interface CrearProductoDTO {
    name: string;
    price: number;
    stock: number;
}

export interface ActualizarProductoDTO {
    name?: string;
    price?: number;
    stock?: number;
}