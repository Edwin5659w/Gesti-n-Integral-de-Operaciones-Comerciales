// src/controllers/ventaController.ts
import { Router, Request, Response } from "express";
import { VentaService } from "../services/ventaService";
import { CreateVentaDTO, UpdateVentaDTO } from "../dto/ventasDTO";

const router = Router();
const service = new VentaService();

// Listar todas las ventas
router.get("/", async (req: Request, res: Response) => {
  try {
    const ventas = await service.list();
    res.json(ventas);
  } catch (error) {
    console.error("Error fetching ventas:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Obtener una venta por ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const venta = await service.get(id);
    if (!venta) {
      return res.status(404).json({ message: "Venta not found" });
    }
    res.json(venta);
  } catch (error) {
    console.error("Error fetching venta:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Crear una nueva venta
router.post("/", async (req: Request, res: Response) => {
  try {
    const dto = new CreateVentaDTO(req.body);
    const newVenta = await service.create(dto);
    res.status(201).json(newVenta);
  } catch (error: any) {
    console.error("Error creating venta:", error);
    res.status(400).json({ message: error.message || "Bad request" });
  }
});

// Actualizar una venta existente
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const dto = new UpdateVentaDTO({ id, ...req.body });
    const updated = await service.update(dto);
    if (!updated) {
      return res.status(404).json({ message: "Venta not found" });
    }
    res.json(updated);
  } catch (error: any) {
    console.error("Error updating venta:", error);
    res.status(400).json({ message: error.message || "Bad request" });
  }
});

// Eliminar una venta
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const success = await service.delete(id);
    if (!success) {
      return res.status(404).json({ message: "Venta not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting venta:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
