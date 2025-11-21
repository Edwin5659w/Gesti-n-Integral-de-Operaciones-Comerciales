# Clientes Service

Microservicio encargado de la **gestión de clientes** dentro del sistema de Gestión Integral de Operaciones Comerciales.  
Forma parte de la arquitectura basada en microservicios junto con **Productos Service** y **Ventas Service**.

---

## 🚀 Características principales
- CRUD completo de clientes:
  - `POST /api/v1/clients` → Crear cliente
  - `GET /api/v1/clients/:id` → Obtener cliente por ID
  - `PUT /api/v1/clients/:id` → Actualizar cliente
  - `DELETE /api/v1/clients/:id` → Eliminar cliente
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

* **Ventas Service** consulta este microservicio para validar la existencia de un cliente antes de registrar una venta.

* No accede directamente a la base de datos de Clientes, solo vía HTTP.