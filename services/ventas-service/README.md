# Ventas Service

Este microservicio se encarga de gestionar las operaciones relacionadas con las ventas en el sistema de gestión integral. A continuación se detallan las características y funcionalidades del servicio.

## Estructura del Proyecto

- **src/**: Contiene el código fuente del microservicio.
  - **app.ts**: Punto de entrada del microservicio, donde se configura el servidor Express y las rutas.
  - **controllers/**: Contiene los controladores que manejan la lógica de las operaciones de ventas.
    - **ventaController.ts**: Controlador para manejar las operaciones relacionadas con las ventas.
  - **routes/**: Define las rutas del microservicio y las asocia con los métodos del controlador.
    - **venta.routes.ts**: Rutas para las operaciones de ventas.
  - **services/**: Contiene la lógica de negocio relacionada con las ventas.
    - **ventaService.ts**: Servicio que maneja la lógica de negocio para las ventas.
  - **repositories/**: Maneja la interacción con la base de datos para las entidades de venta.
    - **ventaRepository.ts**: Repositorio para las operaciones de base de datos relacionadas con las ventas.
  - **models/**: Define los modelos que representan la estructura de los datos.
    - **Venta.ts**: Modelo que representa una venta.
  - **config/**: Configuración del microservicio.
    - **database.ts**: Configura la conexión a la base de datos.

## Instalación

1. Clona el repositorio:
   ```
   git clone <url-del-repositorio>
   ```

2. Navega al directorio del microservicio de ventas:
   ```
   cd services/ventas-service
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

## Ejecución

Para ejecutar el microservicio, utiliza el siguiente comando:
```
npm start
```

El microservicio estará disponible en `http://localhost:3000`.

## Pruebas

Las pruebas unitarias e integración se encuentran en el directorio `tests/`. Para ejecutar las pruebas, utiliza:
```
npm test
```

## Comunicación entre Microservicios

Este microservicio se comunica con otros microservicios (Clientes y Productos) a través de llamadas HTTP. Asegúrate de que los otros microservicios estén en ejecución para realizar pruebas de integración.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o un pull request en el repositorio.

## Licencia

Este proyecto está bajo la Licencia MIT.