# Productos Service

Microservicio encargado de la **gestión de productos e inventario** dentro del sistema de Gestión Integral de Operaciones Comerciales.  
Forma parte de la arquitectura basada en microservicios junto con **Clientes Service** y **Ventas Service**.

---

## 🚀 Características principales
- CRUD completo de productos:
  - `POST /api/v1/products` → Crear producto
  - `GET /api/v1/products/:id` → Obtener producto por ID
  - `PUT /api/v1/products/:id` → Actualizar producto
  - `DELETE /api/v1/products/:id` → Eliminar producto
- Validación de datos mediante DTOs y middlewares.
- Persistencia en base de datos MySQL (contenedor dedicado).
- Comunicación **únicamente vía HTTP** con otros microservicios (no comparte DB).
- Documentación disponible en **Swagger** (`/api-docs`).

---

## 🛠️ Tecnologías utilizadas
- **Node.js** + **Express**
- **TypeScript**
- **Sequelize ORM**
- **MySQL** (contenedor independiente)
- **Docker Compose** (orquestación)
- **Swagger UI** (documentación)

---

## 🔗 Integración con otros servicios

* **Ventas Service** consulta este microservicio para validar la disponibilidad de productos antes de registrar una venta.

* No accede directamente a la base de datos de Productos, solo vía HTTP.
