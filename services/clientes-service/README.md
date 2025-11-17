# Clientes Service

Este microservicio gestiona las operaciones relacionadas con los clientes en el sistema de gestión integral de operaciones comerciales.

## Estructura del Proyecto

- **src/**: Contiene el código fuente del microservicio.
  - **app.ts**: Punto de entrada del microservicio, donde se configura el servidor Express y las rutas.
  - **controllers/**: Contiene los controladores que manejan la lógica de las operaciones relacionadas con los clientes.
    - **clienteController.ts**: Controlador para manejar las operaciones CRUD de clientes.
  - **routes/**: Define las rutas del microservicio y las asocia con los métodos del controlador.
    - **cliente.routes.ts**: Rutas para las operaciones de clientes.
  - **services/**: Contiene la lógica de negocio relacionada con los clientes.
    - **clienteService.ts**: Servicio que maneja la lógica de negocio para los clientes.
  - **repositories/**: Maneja la interacción con la base de datos para las entidades de cliente.
    - **clienteRepository.ts**: Repositorio para la gestión de datos de clientes.
  - **models/**: Define los modelos de datos utilizados en el microservicio.
    - **Cliente.ts**: Modelo que representa la estructura de un cliente.
  - **config/**: Configuraciones del microservicio.
    - **database.ts**: Configuración de la conexión a la base de datos.

## Instalación

1. Clona el repositorio.
2. Navega al directorio del microservicio de clientes:
   ```
   cd services/clientes-service
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

Consulta la documentación de la API en `docs/api/clientes.yaml` para obtener detalles sobre los endpoints disponibles y su uso.