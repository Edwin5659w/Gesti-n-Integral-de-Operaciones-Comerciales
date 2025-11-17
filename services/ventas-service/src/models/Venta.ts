export type VentaItem = { 
  product_id: number; 
  quantity: number; 
  price?: number; 
};

export type Venta = {
  id: number;
  client_id: number;
  items: VentaItem[];
  total: number;
  created_at: string;
};