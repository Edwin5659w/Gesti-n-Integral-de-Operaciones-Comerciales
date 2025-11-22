// src/services/ventaService.ts
import axios from "axios";
import { VentaRepository } from "../repositories/ventaRepository";
import { CreateVentaDTO, UpdateVentaDTO, VentaResponseDTO } from "../dto/ventasDTO";
import { Venta, VentaItem } from "../types/ventas";

export class VentaService {
  private repo = new VentaRepository();

  // URLs de los otros microservicios (usa variables de entorno para flexibilidad)
  private clientesUrl = process.env.CLIENTES_URL || "http://clientes-service:3000/api/v1/clients";
  private productosUrl = process.env.PRODUCTOS_URL || "http://productos-service:3000/api/v1/products";

  async create(dto: CreateVentaDTO): Promise<VentaResponseDTO> {
    try {
      // 1. Validar cliente
      const clienteRes = await axios.get(`${this.clientesUrl}/${dto.client_id}`);
      if (!clienteRes.data) throw new Error("Cliente no encontrado");

      // 2. Validar productos y calcular total
      let total = 0;
      const validatedItems: VentaItem[] = await Promise.all(
        dto.items.map(async (item) => {
          const productoRes = await axios.get(`${this.productosUrl}/${item.product_id}`);
          const producto = productoRes.data.data || productoRes.data.producto || productoRes.data;
          if (!producto) throw new Error(`Producto ${item.product_id} no encontrado`);

          // Normalizar precio
          const rawPrice = item.price ?? producto.precio ?? producto.price;
          const price = Number(typeof rawPrice === "string" ? rawPrice.replace(",", ".") : rawPrice);

          if (isNaN(price)) {
            throw new Error(`El precio del producto ${item.product_id} no es un número válido`);
          }

          const quantity = Number(item.quantity);
          if (isNaN(quantity)) {
            throw new Error(`Producto ${item.product_id} no tiene cantidad válida`);
          }

          total += price * quantity;

          return {
            product_id: item.product_id,
            quantity,
            price,
          };
        })
      );

      // Validar total antes de guardar
      if (isNaN(total)) {
        throw new Error("El total calculado no es válido");
      }

      // 3. Registrar venta en la DB local
      const venta: Venta = await this.repo.createVenta({
        ...dto,
        items: validatedItems,
        total: Number(total), // fuerza número válido
        created_at: new Date().toISOString(),
      } as Venta);

      return new VentaResponseDTO(venta);
    } catch (err: any) {
      throw new Error(`Error al crear venta: ${err.message}`);
    }
  }

  async list(): Promise<VentaResponseDTO[]> {
    const ventas = await this.repo.findAllVentas();
    return ventas.map((v) => new VentaResponseDTO(v));
  }

  async get(id: number): Promise<VentaResponseDTO | null> {
    const venta = await this.repo.findVentaById(id);
    return venta ? new VentaResponseDTO(venta) : null;
  }

  async update(dto: UpdateVentaDTO): Promise<VentaResponseDTO | null> {
    try {
      // Validar cliente si se actualiza
      if (dto.client_id) {
        const clienteRes = await axios.get(`${this.clientesUrl}/${dto.client_id}`);
        if (!clienteRes.data) throw new Error("Cliente no encontrado");
      }

      let total = 0;
      let validatedItems: VentaItem[] | undefined;

      // Validar productos si se actualizan
      if (dto.items) {
        validatedItems = await Promise.all(
          dto.items.map(async (item) => {
            const productoRes = await axios.get(`${this.productosUrl}/${item.product_id}`);
            const producto = productoRes.data.data || productoRes.data.producto || productoRes.data;
            if (!producto) throw new Error(`Producto ${item.product_id} no encontrado`);

            const rawPrice = item.price ?? producto.precio ?? producto.price;
            const price = Number(typeof rawPrice === "string" ? rawPrice.replace(",", ".") : rawPrice);

            if (isNaN(price)) {
              throw new Error(`El precio del producto ${item.product_id} no es un número válido`);
            }

            const quantity = Number(item.quantity);
            if (isNaN(quantity)) {
              throw new Error(`Producto ${item.product_id} no tiene cantidad válida`);
            }

            total += price * quantity;

            return {
              product_id: item.product_id,
              quantity,
              price,
            };
          })
        );
      }

      if (validatedItems && isNaN(total)) {
        throw new Error("El total calculado no es válido");
      }

      const updated = await this.repo.updateVenta(dto.id, {
        ...dto,
        items: validatedItems ?? dto.items,
        total: validatedItems ? Number(total) : dto.total!,
        created_at: new Date().toISOString(),
      } as Venta);

      return updated ? new VentaResponseDTO(updated) : null;
    } catch (err: any) {
      throw new Error(`Error al actualizar venta: ${err.message}`);
    }
  }

  async delete(id: number): Promise<boolean> {
    return await this.repo.deleteVenta(id);
  }
}
