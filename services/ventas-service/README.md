# Ventas Service

Microservicio encargado de la **gestión de ventas** dentro del sistema de Gestión Integral de Operaciones Comerciales.  
Forma parte de la arquitectura basada en microservicios junto con **Clientes Service** y **Productos Service**.

---

## 🚀 Características principales
- CRUD completo de ventas:
  - `POST /api/v1/sales` → Registrar venta
  - `GET /api/v1/sales/:id` → Obtener venta por ID
  - `PUT /api/v1/sales/:id` → Actualizar venta
  - `DELETE /api/v1/sales/:id` → Eliminar venta
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

* **Clientes Service**: este microservicio consulta a Clientes para validar la existencia del cliente antes de registrar una venta.

* **Productos Service**: este microservicio consulta a Productos para verificar la disponibilidad del producto antes de registrar la transacción.

* No accede directamente a las bases de datos de Clientes ni de Productos, solo vía HTTP.
