// src/dto/ventaDTO.ts
import { Venta, VentaItem } from "../types/ventas";

// DTO para crear un ítem de venta
export class CreateVentaItemDTO {
  product_id: number;
  quantity: number;
  price?: number;

  constructor(item: Omit<VentaItem, "venta_id">) {
    this.product_id = item.product_id;
    this.quantity = item.quantity;
    this.price = item.price;
  }
}

// DTO para crear una venta
export class CreateVentaDTO {
  client_id: number;
  items: CreateVentaItemDTO[];
  total: number;

  constructor(venta: Omit<Venta, "id" | "created_at">) {
    this.client_id = venta.client_id;
    this.items = venta.items.map(i => new CreateVentaItemDTO(i));
    this.total = venta.total;
  }
}

// DTO para actualizar una venta
export class UpdateVentaDTO {
  id!: number;
  client_id?: number;
  items?: CreateVentaItemDTO[];
  total?: number;

  constructor(venta: Partial<Omit<Venta, "created_at"> & { id: number }>) {
    this.id = venta.id!;
    if (venta.client_id !== undefined) this.client_id = venta.client_id;
    if (venta.items !== undefined) {
      this.items = venta.items.map(i => new CreateVentaItemDTO(i));
    }
    if (venta.total !== undefined) this.total = venta.total;
  }
}

// DTO para respuesta de venta
export class VentaResponseDTO {
  id: number;
  client_id: number;
  items: VentaItem[];
  total: number;
  created_at: string;

  constructor(venta: Venta) {
    this.id = venta.id;
    this.client_id = venta.client_id;
    this.items = venta.items;
    this.total = venta.total;
    this.created_at = venta.created_at;
  }
}
