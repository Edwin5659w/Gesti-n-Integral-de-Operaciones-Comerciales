// src/services/ventaService.ts
import axios from "axios";
import { VentaRepository } from "../repositories/ventaRepository";
import { CreateVentaDTO, UpdateVentaDTO, VentaResponseDTO } from "../dto/ventasDTO";
import { Venta as VentaType } from "../types/ventas";

export class VentaService {
  private repo = new VentaRepository();

  // URLs de los otros microservicios (ajusta según tu docker-compose)
  private clientesUrl = "http://clientes-service:3000/api/v1/clients";
  private productosUrl = "http://productos-service:3000/api/v1/products";

  async create(dto: CreateVentaDTO): Promise<VentaResponseDTO> {
    // 1. Validar cliente vía HTTP
    const clienteRes = await axios.get(`${this.clientesUrl}/${dto.client_id}`);
    if (!clienteRes.data) {
      throw new Error("Cliente no encontrado");
    }

    // 2. Validar productos vía HTTP
    for (const item of dto.items) {
      const productoRes = await axios.get(`${this.productosUrl}/${item.product_id}`);
      if (!productoRes.data) {
        throw new Error(`Producto ${item.product_id} no encontrado`);
      }
      // opcional: validar stock, precio, etc.
    }

    // 3. Registrar venta en la DB local
    const venta = await this.repo.createVenta(dto as unknown as VentaType);
    return new VentaResponseDTO(venta);
  }

  async list(): Promise<VentaResponseDTO[]> {
    const ventas = await this.repo.findAllVentas();
    return ventas.map(v => new VentaResponseDTO(v));
  }

  async get(id: number): Promise<VentaResponseDTO | null> {
    const venta = await this.repo.findVentaById(id);
    return venta ? new VentaResponseDTO(venta) : null;
  }

  async update(dto: UpdateVentaDTO): Promise<VentaResponseDTO | null> {
    // Validar cliente si se actualiza
    if (dto.client_id) {
      const clienteRes = await axios.get(`${this.clientesUrl}/${dto.client_id}`);
      if (!clienteRes.data) {
        throw new Error("Cliente no encontrado");
      }
    }

    // Validar productos si se actualizan
    if (dto.items) {
      for (const item of dto.items) {
        const productoRes = await axios.get(`${this.productosUrl}/${item.product_id}`);
        if (!productoRes.data) {
          throw new Error(`Producto ${item.product_id} no encontrado`);
        }
      }
    }

    const updated = await this.repo.updateVenta(dto.id, dto as unknown as VentaType);
    return updated ? new VentaResponseDTO(updated) : null;
  }

  async delete(id: number): Promise<boolean> {
    return await this.repo.deleteVenta(id);
  }
}
