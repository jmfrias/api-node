<h1 style="text-align: center"> API NODE</h1>

## Technology
Nodejs

## Description
This api was created for testing purposes.

## Organization
The code is organized as:

````bash
├── README.md
├── package-lock.json
├── package.json
└── src
    ├── config
    │   └── config.js
    ├── controller
    │   ├── health.js
    │   ├── logger.js
    ├── index.js
    ├── models
    │   ├── heath.js
    │   ├── logger.js
    ├── routes
    │   ├── health.js
    ├── static
    │   ├── info.json
    │   ├── messages.json
    │   ├── operations.json
    │   ├── results.json
    │   └── swagger.yml
    └── test
        └── health.js
````

## Instalation
After downloading the code, we can install all dependencies required using the command **npm install**

````bash
npm install

> nodemon@2.0.7 postinstall F:\Juancho\Repositorios\api-node\node_modules\nodemon
````

## Scripts
The following scripts are available:

````json
"scripts": {
    "dev": "nodemon ./src/index.js",
    "start": "node ./src/index.js", 
    "test": "mocha ./src/test/*.js --exit"
  }
````

#### Script Description
- dev: Starts the service on dev mode using the nodemon module. This will restart the nodejs' service everytime we make a change into the code, it becomes very usefull for making local tests.
- start: Starts the application.
- test: Executes unitary tests configured using frameworks mocha and chai.

## Execution
To start the service we can execute:
- npm run dev
- npm start

This service doesn't use other variables rather the start up port. In case we don't specify any port, it'll use the default for node js ( Port **3000** )

````bash
├── README.md
├── package-lock.json
├── package.json
├── .env
└── src
````
To specify a different port, we'll have to create the .env file in the root directory of the repository with the following content:

````properties
PORT=8080
````

After creating the file, we execute the command **npm start** to start the service.

````bash
npm start
> api-node@1.0.0 start
> node ./src/index.js

{ "date": "2021-10-10T18:58:06.555Z", "name": "api-node", "meta": { "branch": "master", "version": "v1.0" }, "operation": "HealthCheck", "result": "ok", "code": 200, "message": "Service ApiNode started", "data": [] }

Server started on port 8080
````

After starting the service, we'll see the message "Server started on **port 8080**". The port's value should be the same we defined on the .env file.

## Usage
To use this api we can rather access by browser using swagger, by postman or curl command. To access swagger we can use the followings URLs:
- http://localhost:8080/swagger
- http://localhost:8080

### Endpoint healthcheck
````bash
── health
    └── GET /health #--> Service status
````

## Unit tests
The following tests are available:
````bash
── health (Healthcheck Service)
    └── Healthcheck service
````

The modules are under src/test directory.

````bash
── src
    └── test
        └── health.js
````

To execute all tests, we invoque the script defined inside package.json file. 

````bash
npm run test

TEST HealthCheck
    GET /health
    ✓ Returns service status

5 passing (48ms)
````

All test should answer with a tick to ensure they worked properly.

End