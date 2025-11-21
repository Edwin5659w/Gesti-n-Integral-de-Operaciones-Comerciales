export interface VentaItem { 
  product_id: number; 
  quantity: number; 
  price?: number; 
}

export interface Venta {
  id: number;
  client_id: number;
  items: VentaItem[];
  total: number;
  created_at: string;
}