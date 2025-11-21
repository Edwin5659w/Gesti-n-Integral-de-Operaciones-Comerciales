import { ProductoRepository } from '../repositories/productoRepository';
import { Producto } from '../type/Producto';
import { CreateProductoDTO, UpdateProductoDTO, ProductoResponseDTO } from '../dto/productDTO';

export class ProductoService {
  repo = new ProductoRepository();

  async create(dto: CreateProductoDTO): Promise<ProductoResponseDTO> {
    const p = await this.repo.createProducto(dto);
    return new ProductoResponseDTO(p);
  }

  async list(): Promise<ProductoResponseDTO[]> {
    const productos: Producto[] = await this.repo.findAllProductos();
    return productos.map(p => new ProductoResponseDTO(p));
  }

  async get(id: number): Promise<ProductoResponseDTO | null> {
    const producto: Producto | null = await this.repo.findProductoById(id);
    return producto ? new ProductoResponseDTO(producto) : null;
  }

  async update(dto: UpdateProductoDTO): Promise<Producto | null> {
    const updated = await this.repo.updateProducto(dto.id, dto);
    return updated ? new ProductoResponseDTO(updated) : null;
  }

  async delete(id: number): Promise<boolean> {
    return await this.repo.deleteProducto(id);
  }
}