import { Producto } from '../type/Producto';



// DTO para crear un producto
export class CreateProductoDTO {
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  constructor(producto: Omit<Producto, 'id' | 'created_at'>) {
    this.nombre = producto.nombre;
    this.descripcion = producto.descripcion;
    this.precio = producto.precio;
    this.stock = producto.stock;
  }
}

export class UpdateProductoDTO {
  id!: number;
  nombre?: string;
  descripcion?: string;
  precio?: number
  stock?: number;
  constructor(producto: Partial<Omit<Producto,'created_at'> & {id: number}>) {
    this.id = producto.id!;
    if (producto.nombre !== undefined) this.nombre = producto.nombre;
    if (producto.descripcion !== undefined) this.descripcion = producto.descripcion;
    if (producto.precio !== undefined) this.precio = producto.precio;
    if (producto.stock !== undefined) this.stock = producto.stock;
  }
}

export class ProductoResponseDTO {
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  constructor(producto: Producto) {
    this.nombre = producto.nombre;
    this.descripcion = producto.descripcion;
    this.precio = producto.precio;
    this.stock = producto.stock;
  }
}
