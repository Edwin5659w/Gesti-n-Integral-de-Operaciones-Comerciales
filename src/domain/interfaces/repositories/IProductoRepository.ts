import { Producto, CrearProductoDTO, ActualizarProductoDTO } from '../../entities/Producto';

export interface IProductoRepository {
    crear(producto: CrearProductoDTO): Promise<Producto>;
    obtenerTodos(): Promise<Producto[]>;
    obtenerPorId(id: number): Promise<Producto | null>;
    actualizar(id: number, producto: ActualizarProductoDTO): Promise<Producto>;
}