# Productos Service

Este microservicio se encarga de gestionar las operaciones relacionadas con los productos en el sistema de gestión integral de operaciones comerciales.

## Estructura del Proyecto

- **src/**: Contiene el código fuente del microservicio.
  - **app.ts**: Punto de entrada del microservicio, donde se configura el servidor Express y las rutas.
  - **controllers/**: Contiene los controladores que manejan la lógica de las rutas.
    - **productoController.ts**: Controlador para las operaciones de productos.
  - **routes/**: Define las rutas del microservicio y las asocia con los controladores.
    - **producto.routes.ts**: Rutas para las operaciones de productos.
  - **services/**: Contiene la lógica de negocio relacionada con los productos.
    - **productoService.ts**: Servicio para manejar la lógica de productos.
  - **repositories/**: Maneja la interacción con la base de datos.
    - **productoRepository.ts**: Repositorio para las entidades de producto.
  - **models/**: Define los modelos de datos.
    - **Producto.ts**: Modelo que representa la estructura de un producto.
  - **config/**: Configuración del microservicio.
    - **database.ts**: Configuración de la conexión a la base de datos.

## Instalación

1. Clona el repositorio.
2. Navega al directorio del microservicio de productos:
   ```
   cd services/productos-service
   ```
3. Instala las dependencias:
   ```
   npm install
   ```

## Ejecución

Para iniciar el microservicio, ejecuta el siguiente comando:
```
npm start
```

## Pruebas

Las pruebas unitarias e integración se encuentran en el directorio `tests/`. Para ejecutar las pruebas, utiliza:
```
npm test
```

## API

Consulta el archivo `docs/api/productos.yaml` para obtener la especificación de la API del microservicio de productos.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cambios o mejoras.