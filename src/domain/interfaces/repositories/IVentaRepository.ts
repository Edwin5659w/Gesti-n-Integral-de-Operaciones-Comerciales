import { Venta, CrearVentaDTO } from '../../entities/Venta';

export interface IVentaRepository {
    crearVenta(venta: CrearVentaDTO): Promise<Venta>;
    obtenerTodas(): Promise<Venta[]>;
    obtenerPorId(id: number): Promise<Venta | null>;
}