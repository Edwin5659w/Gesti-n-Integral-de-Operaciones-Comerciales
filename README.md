# Gestión Integral de Microservicios

Este proyecto implementa un sistema de microservicios para la gestión integral de clientes, productos e inventario, y ventas. Cada microservicio se comunica a través de llamadas HTTP y expone endpoints REST para realizar operaciones específicas.

## Estructura del Proyecto

El proyecto está organizado en la siguiente estructura de archivos:

- **docker-compose.yml**: Define y ejecuta múltiples contenedores de Docker para orquestar los microservicios.
- **.env.example**: Contiene ejemplos de variables de entorno utilizadas por los microservicios.
- **README.md**: Documentación general del proyecto, incluyendo instrucciones de instalación y uso.
- **services/**: Contiene los microservicios individuales:
  - **clientes-service/**: Microservicio para la gestión de clientes.
  - **productos-service/**: Microservicio para la gestión de productos e inventario.
  - **ventas-service/**: Microservicio para la gestión de ventas.
- **infra/**: Contiene configuraciones de infraestructura, como Nginx y colecciones de Postman.
- **docs/**: Documentación adicional, incluyendo diagramas de arquitectura y especificaciones de API.

## Instalación

1. Clona el repositorio en tu máquina local.
2. Navega al directorio del proyecto.
3. Copia el archivo `.env.example` a `.env` y configura las variables de entorno según sea necesario.
4. Ejecuta `docker-compose up` para iniciar todos los microservicios.

## Uso

Cada microservicio expone sus propios endpoints REST. Consulta la documentación específica de cada microservicio en sus respectivos archivos `README.md` para obtener detalles sobre los endpoints disponibles y cómo interactuar con ellos.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.