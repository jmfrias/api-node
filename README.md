<h1 style="text-align: center"> API NODE</h1>

## Tecnologia
Nodejs

## Descripcion
La funcionalidad principal de esta api es que sirva para realizar pruebas de infraestructura, probar funcionalidades de pipelines, etc.

## Funcionalidad
<p align=justify>
Utiliza un archivo estático con nombres y edades de personas. Para reiniciarla a su estado inicial y borrar todas las modificaciones realizadas, basta con reiniciar el servicio de node en donde se encuentra corriendo.
</p>

Esta API permite hacer las siguientes operaciones:
- Consulta de healthCheck
- ABM de personas
    - Alta
    - Baja
    - Modificacion
    - Consulta

## Organizacion
El codigo esta organizado de la siguiente manera:

````bash
├── README.md
├── package-lock.json
├── package.json
├── .env
└── src
    ├── config
    │   └── config.js
    ├── controller
    │   ├── health.js
    │   ├── logger.js
    │   ├── persona.js
    │   └── validaciones.js
    ├── index.js
    ├── models
    │   ├── heath.js
    │   ├── logger.js
    │   └── persona.js
    ├── routes
    │   ├── health.js
    │   └── persona.js
    ├── static
    │   ├── info.json
    │   ├── mensajes.json
    │   ├── operaciones.json
    │   ├── resultados.json
    │   └── swagger.json
    ├── templates
    │   └── personas.json
    └── test
        ├── health.js
        └── persona.js
````

## Uso
Una vez descargado podemos iniciar el servicio invocando alguno de los siguientes scripts:


````json
"scripts": {
    "dev": "nodemon ./src/index.js",
    "start": "node ./src/index.js",
    "test": "mocha ./src/test/*.js --exit"
  }
````
    - npm start: Para iniciar el servicio
    - npm run dev: Para iniciar el servicio en modo desarrollador.
    - npm run test: Para ejecutar los tests unitarios programados para la aplicacion.

Este serivcio no utiliza variables más allá del puerto de inicio, que en caso de no especificarse alguno, este iniciara en el puerto 3000 (Puerto por default de nodejs).

````bash
├── README.md
├── package-lock.json
├── package.json
├── .env
└── src
````
Para especificar un puerto distintos, se debe crear un archivo .env en el directorio raiz del codigo con siguiente contenido

````properties
PORT=8080
````

Una vez creado el archivo ejecutamos el comando npm start para dar inicio al servicio.

````bash
npm start
> api-node@1.0.0 start
> node ./src/index.js

{"fecha":"2021-04-12T16:46:03.571Z","nombre":"api-node","meta":{"branch":"master","version":"v1.0"},"operacion":"Carga de datos de personas","resultado":"ok","codigo":200,"mensaje":"Carga de personas exitosa","datos":{}}

Server started on port 8080
````

El mensaje "Server started on port 8080" debe coincidir con el ser puerto definido en el archivo .env