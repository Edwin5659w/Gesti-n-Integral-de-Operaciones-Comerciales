import { IVentaRepository } from '../../../domain/interfaces/repositories/IVentaRepository';
import { CrearVentaDTO } from '../../../domain/entities/Venta';

export class VentaService {
    constructor(private repository: IVentaRepository) {}

    async crearVenta(dto: CrearVentaDTO) {
        if (!dto.client_id || !dto.products.length) {
            throw new Error('Se requiere ID del cliente y al menos un producto');
        }
        return this.repository.crearVenta(dto);
    }

    async obtenerVentas() {
        return this.repository.obtenerTodas();
    }

    async obtenerVentaPorId(id: number) {
        return this.repository.obtenerPorId(id);
    }
}