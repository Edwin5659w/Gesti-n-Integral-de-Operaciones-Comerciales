import { Producto } from '../type/Producto';
import { ProductModel } from '../model/productoModel';


let productos: Producto[] = [];
let nextId = 1;

export class ProductoRepository {
  async create(data: Omit<Producto, 'id' | 'created_at'>) {
    const p: Producto = { 
      id: nextId++, 
      created_at: new Date().toISOString(), 
      ...data 
    };
    productos.push(p);
    return p;
  }

  async findAll(): Promise<Producto[]> {
    const productos = await ProductModel.findAll();
    return productos.map(j => j.toJSON() as Producto);
  }

  async findById(id: number) {
    return productos.find(p => p.id === id) || null;
  }

  async update(id: number, patch: Partial<Producto>) {
    const idx = productos.findIndex(p => p.id === id);
    if (idx === -1) return null;
    productos[idx] = { ...productos[idx], ...patch };
    return productos[idx];
  }

  async remove(id: number) {
    const idx = productos.findIndex(p => p.id === id);
    if (idx === -1) return false;
    productos.splice(idx, 1);
    return true;
  }

}