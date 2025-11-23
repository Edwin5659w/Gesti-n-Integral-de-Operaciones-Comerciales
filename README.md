# Gestión Integral de Microservicios

Este proyecto implementa un sistema de microservicios para la gestión integral de **clientes, productos/inventario** y **ventas**. Cada microservicio expone endpoints REST y se comunica con los demás únicamente mediante llamadas HTTP, garantizando independencia de bases de datos y escalabilidad. La infraestructura se orquesta con **Docker Compose** y se expone a través de un **API Gateway (Nginx)**.


# Integrantes
* Edwin Yair Molina Cerón
    - 408873
    - edwin.molina01@unicatolica.edu.co
* Sebastian Ceballos Correa
    - 408964
    - 01sebas.co@gmail.com / sebastian.ceballos01@unicatolica.edu.co

## Entrega I
  [Link Video](https://www.youtube.com/watch?v=22MtTm7h-cM)

## Entrega II
- [Video-I-Arquitectura](https://youtu.be/M5Cm5fFzvBY?si=UbTukX3xnzVdH0NF)
- [Video-II-Postman](https://www.youtube.com/watch?v=kZEB3uvC8AI)

## Entrega III
- [Video](https://www.youtube.com/watch?v=7-n8GQDU0ng)
- [Resumen](https://youtu.be/Ql9z4shZKiQ)

## 🏗️ Arquitectura

* **Clientes Service** → CRUD de clientes.
* **Productos Service** → CRUD de productos e inventario.
* **Ventas Service** → Registro y gestión de ventas, validando clientes y productos vía HTTP.
* **Nginx Gateway** → Reverse proxy que enruta todas las peticiones externas hacia los microservicios.
* **Swagger UI** → Documentación de cada servicio disponible en /api-docs.
* **Postman** → Colección y environments para pruebas de integración.

## 📂 Estructura del Proyecto

### Diagrama de Microservicios

![Diagrama](https://www.plantuml.com/plantuml/dsvg/ZPB1JiCm38RlVGgh5-2m5q02ZQr2dD0ankucCSZGELMIJaY8f-8HU36ITb5KY5Xxs2hx_t_tSx9q7gtlzss5oXiBZwv7owQgpk3gdoUqrqOy2UbWQenw8tlA8aOJrADsS2CBsHe-AWYFCllE28c7-lw5vRq6T23nhVhTNxSS_id10za3AngawbWyrWQFHezFw0YofLbDrCtgJ_h66jqhRwRnNQgMyhCf3SZwmeHT-CLf_26Mojb97eApCgMUMFaekMtxLmETPL7SOGkQW0EyHQNu-qjc1gMh0Ol5zNWmiJg-nLhf17AtlC3SdYvWFjiEMzQes0YvaKhGHS9nQtE39kDBD70P4Yq_iyBKWlExxNPpKVHdtb90wgM4-RWtIf4pW12lni2fCSo8YHtFnirm1U1c5INv-qjGGLJ6pjVpirgIw7xV_W00)

### Estructura de carpetas

```
|-- docs
|   `-- arquitectura
|       `-- C4
|-- infra
|   |-- nginx
|   `-- postman
|       |-- collections
|       `-- environments
`-- services
    |-- clientes-service
    |   |-- docs
    |   |   `-- api
    |   |-- src
    |   |   |-- config
    |   |   |-- controllers
    |   |   |-- dto
    |   |   |-- models
    |   |   |-- repositories
    |   |   |-- services
    |   |   `-- type
    |   `-- tests
    |-- productos-service
    |   |-- docs
    |   |   `-- api
    |   |-- src
    |   |   |-- config
    |   |   |-- controllers
    |   |   |-- dto
    |   |   |-- model
    |   |   |-- repositories
    |   |   |-- services
    |   |   `-- type
    |   `-- tests
    `-- ventas-service
        |-- docs
        |   `-- api
        |-- src
        |   |-- config
        |   |-- controllers
        |   |-- dto
        |   |-- models
        |   |-- repositories
        |   |-- services
        |   `-- types
        `-- tests
```

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
`git clone <repo-url>`
2. Navega al directorio del proyecto.
`cd Gesti-n-integral-de-Operaciones-Comerciales`
3. `docker compose build --no-cache` -> Ejecuta el compose y empieza a construir las imagenes de cada servicio sin levantar el contenedor, la opcion --no-cache levanta las imagenes sin tener en cuenta el cache de las anteriores imagenes, esto asegura que las imagenes se creen con los ultimos cambios.
4. `docker compose up -d` -> Lee el compose y crea el contenedor, los volumenes y la red interna para que las imagenes se comuniquen entre si, en contenedor se compone de lo siguiente: una iamgen de mysql para cada servicio, y una imagen de nginx que es la que orquesta los endpoints dirigiendolos al servicio correcto, la opción -d se usa para ejecutar en segundo plano.
5. ` docker compose down -v` solo usar cuando ya no se desee usar el contenedor. Este comando elimina el contenedor, sus volumenes y las redes internas, si solo se desea eliminar las imagenes del contenedor se debe quitar la opcion -v, de lo contrario los volumenes no persistirian y la información de las bases de datos desapareceria.
6. Probar los endpoints

* **Clientes** → http://localhost:8080/api/v1/clients
* **Productos** → http://localhost:8080/api/v1/products
* **Ventas** → http://localhost:8080/api/v1/sales
* **Swagger Docs** → http://localhost:8080/api-docs/:service

## 🚀 Uso

* Cada microservicio expone sus endpoints **REST** bajo el prefijo /api/v1/....
* La documentación interactiva está disponible en **Swagger** (/api-docs/:servicio-a-consultar).
* Se incluye una colección de **Postman** y dos environments:
  * **Local** → acceso directo a puertos internos (3001, 3002, 3003).
  * **Gateway** → acceso a través de Nginx (http://localhost:8080/api/v1/...).

## 📖 Ejemplo de flujo

1. Crear un cliente en **Clientes Service**.
2. Crear un producto en **Productos Service**.
3. Registrar una venta en **Ventas Service**, que validará cliente y producto vía **HTTP**.


## 📜 Licencia

Este proyecto está bajo la Licencia MIT.
