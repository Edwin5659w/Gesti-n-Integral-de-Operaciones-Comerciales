import { IProductoRepository } from '../../../domain/interfaces/repositories/IProductoRepository';
import { Producto, CrearProductoDTO, ActualizarProductoDTO } from '../../../domain/entities/Producto';

export class ProductoService {
    constructor(private repository: IProductoRepository) {}

    async crearProducto(dto: CrearProductoDTO): Promise<Producto> {
        return this.repository.crear(dto);
    }

    async obtenerProductos(): Promise<Producto[]> {
        return this.repository.obtenerTodos();
    }

    async obtenerProductoPorId(id: number): Promise<Producto | null> {
        return this.repository.obtenerPorId(id);
    }

    async actualizarProducto(id: number, dto: ActualizarProductoDTO): Promise<Producto> {
        return this.repository.actualizar(id, dto);
    }

    async eliminarProducto(id: number): Promise<void> {
        return this.repository.eliminarProducto(id);
    }
}