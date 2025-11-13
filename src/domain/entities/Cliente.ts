export class Cliente {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public phone: string,
        public created_at: Date
    ) {}
}

export interface CrearClienteDTO {
    name: string;
    email: string;
    phone: string;
}

export interface ActualizarClienteDTO {
    name?: string;
    email?: string;
    phone?: string;
}