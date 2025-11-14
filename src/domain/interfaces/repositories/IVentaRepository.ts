import { Venta, CrearVentaDTO } from '../../entities/Venta';

export interface IVentaRepository {
    crearVenta(venta: CrearVentaDTO): Promise<Venta>;
    obtenerTodas(): Promise<Venta[]>;
    obtenerPorId(id: number): Promise<Venta | null>;
    actualizarVenta(id: number, dto: { client_id?: number; products?: { product_id: number; quantity: number }[] }): Promise<Venta>;
    eliminarVenta(id: number): Promise<void>;
}