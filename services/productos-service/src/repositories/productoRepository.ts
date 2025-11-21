// src/repositories/productoRepository.ts
import { Producto } from "../type/Producto";
import { ProductoModel } from "../model/productoModel";

export class ProductoRepository {
  async findAllProductos(): Promise<Producto[]> {
    const productos = await ProductoModel.findAll();
    return productos.map(p => p.toJSON() as Producto);
  }

  async findProductoById(id: number): Promise<Producto | null> {
    const producto = await ProductoModel.findByPk(id);
    return producto ? (producto.toJSON() as Producto) : null;
  }

  async createProducto(data: Omit<Producto, "id" | "created_at">): Promise<Producto> {
    const newProducto = await ProductoModel.create(data);
    return newProducto.toJSON() as Producto;
  }

  async updateProducto(id: number, data: Partial<Producto>): Promise<Producto | null> {
    const producto = await ProductoModel.findByPk(id);
    if (!producto) return null;
    await producto.update(data);
    return producto.toJSON() as Producto;
  }

  async deleteProducto(id: number): Promise<boolean> {
    const deleted = await ProductoModel.destroy({ where: { id } });
    return deleted > 0;
  }
}
