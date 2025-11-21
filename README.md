# Gestión Integral de Microservicios

Este proyecto implementa un sistema de microservicios para la gestión integral de **clientes, productos/inventario** y **ventas**. Cada microservicio expone endpoints REST y se comunica con los demás únicamente mediante llamadas HTTP, garantizando independencia de bases de datos y escalabilidad. La infraestructura se orquesta con **Docker Compose** y se expone a través de un **API Gateway (Nginx)**.

## 🏗️ Arquitectura

* **Clientes Service** → CRUD de clientes.
* **Productos Service** → CRUD de productos e inventario.
* **Ventas Service** → Registro y gestión de ventas, validando clientes y productos vía HTTP.
* **Nginx Gateway** → Reverse proxy que enruta todas las peticiones externas hacia los microservicios.
* **Swagger UI** → Documentación de cada servicio disponible en /api-docs.
* **Postman** → Colección y environments para pruebas de integración.

## 📂 Estructura del Proyecto

El proyecto está organizado en la siguiente estructura de archivos:

- **docker-compose.yml**: Define y ejecuta múltiples contenedores de Docker para orquestar los microservicios.
- **README.md**: Documentación general del proyecto, incluyendo instrucciones de instalación y uso.
- **services/**: Contiene los microservicios individuales:
  - **clientes-service/**: Microservicio para la gestión de clientes.
  - **productos-service/**: Microservicio para la gestión de productos e inventario.
  - **ventas-service/**: Microservicio para la gestión de ventas.
- **infra/**: Contiene configuraciones de infraestructura, como Nginx y colecciones de Postman.
- **docs/**: Documentación adicional, incluyendo diagramas de arquitectura y especificaciones de API.

## ⚙️ Instalación

1. Clona el repositorio en tu máquina local.
```bash
git clone <repo-url>
```
2. Navega al directorio del proyecto.
```bash
cd Gesti-n-integral-de-Operaciones-Comerciales
```
3. Ejecuta `docker-compose up` para iniciar todos los microservicios.
```bash
docker-compose up -d
```
4. Probar los endpoints

* **Clientes** → http://localhost:8080/api/v1/clients
* **Productos** → http://localhost:8080/api/v1/products
* **Ventas** → http://localhost:8080/api/v1/sales
* **Swagger Docs** → http://localhost:8080/api-docs/:service

## 🚀 Uso

* Cada microservicio expone sus endpoints **REST** bajo el prefijo /api/v1/....
* La documentación interactiva está disponible en **Swagger** (/api-docs).
* Se incluye una colección de **Postman** y dos environments:
  * **Local** → acceso directo a puertos internos (3001, 3002, 3003).
  * **Gateway** → acceso a través de Nginx (http://localhost:8080/api/v1/...).

## 📖 Ejemplo de flujo

1. Crear un cliente en **Clientes Service**.
2. Crear un producto en **Productos Service**.
3. Registrar una venta en **Ventas Service**, que validará cliente y producto vía **HTTP**.


## 📜 Licencia

Este proyecto está bajo la Licencia MIT.