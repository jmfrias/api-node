<h1 style="text-align: center"> API NODE</h1>

## Technology
Nodejs

## Description
This api was created for testing purposes.

## Organization
The code is organized as:

````bash
├── Dockerfile
├── README.md
├── deploy
│   ├── charts
│   │   └── api-node
│   │       ├── Chart.yaml
│   │       ├── templates
│   │       │   ├── NOTES.txt
│   │       │   ├── _helpers.tpl
│   │       │   ├── _pod.tpl
│   │       │   ├── configmap.yaml
│   │       │   ├── deployment.yaml
│   │       │   ├── hpa.yaml
│   │       │   ├── ingress.yaml
│   │       │   ├── service.yaml
│   │       │   ├── serviceaccount.yaml
│   │       │   └── tests
│   │       │       └── test-connection.yaml
│   │       └── values.yaml
│   ├── config
│   │   └── api-node
│   │       └── values.yaml.gotmpl
│   └── helmfile.yaml
├── package-lock.json
├── package.json
└── src
    ├── config
    │   └── config.js
    ├── controller
    │   ├── health.js
    │   └── logger.js
    ├── index.js
    ├── models
    │   ├── heath.js
    │   └── logger.js
    ├── routes
    │   └── health.js
    ├── static
    │   ├── info.json
    │   ├── messages.json
    │   ├── operations.json
    │   ├── results.json
    │   └── swagger.yml
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

## Deployment for Kubernetes using Docker

### Start minikube

We start minikube using this command.

````bash
minikube start --driver=docker
👍  Starting control plane node minikube in cluster minikube
🚜  Pulling base image ...
🔄  Restarting existing docker container for "minikube" ...
🐳  Preparing Kubernetes v1.22.1 on Docker 20.10.8 ...
🔎  Verifying Kubernetes components...
    ▪ Using image k8s.gcr.io/metrics-server/metrics-server:v0.4.2
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🌟  Enabled addons: storage-provisioner, metrics-server, default-storageclass
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
````

Then we execute this command to allow minikube to use our local docker images if we don't have a registry.

````bash
eval $(minikube docker-env)
````

### Create image

We build the docker images for the service api-node using the DockerFile provided in the git repository.

````bash
docker build . -t api-node:v1.0 --no-cache

Sending build context to Docker daemon  39.69MB
Step 1/8 : FROM node:latest
 ---> a0de64d21893
Step 2/8 : RUN mkdir /apinode
 ---> Running in 727014a52bd9
Removing intermediate container 727014a52bd9
 ---> 89f7f4421751
Step 3/8 : WORKDIR /apinode
 ---> Running in c173befed4a1
Removing intermediate container c173befed4a1
 ---> 286d76baef5f
Step 4/8 : COPY package.json .
 ---> 5fcf2351af64
Step 5/8 : COPY package-lock.json .
 ---> b7fa31446376
Step 6/8 : ADD src src
 ---> 0430ef5b01cf
Step 7/8 : RUN npm install
 ---> Running in 2594d17bc8b8

added 304 packages, and audited 305 packages in 9s

13 packages are looking for funding
  run `npm fund` for details

9 vulnerabilities (8 moderate, 1 high)

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
npm notice 
npm notice New patch version of npm available! 8.3.0 -> 8.3.1
npm notice Changelog: <https://github.com/npm/cli/releases/tag/v8.3.1>
npm notice Run `npm install -g npm@8.3.1` to update!
npm notice 
Removing intermediate container 2594d17bc8b8
 ---> bdb9b2ba206d
Step 8/8 : CMD ["npm", "start"]
 ---> Running in 5ebe4b77f170
Removing intermediate container 5ebe4b77f170
 ---> 237f40398ef3
Successfully built 237f40398ef3
Successfully tagged api-node:v1.0

````

### Deploy service

To deploy de service you need to apply the manifests provided in the repository. Go into the deploy directory and you'll see this files and directories.

````bash
.
├── charts
├── config
└── helmfile.yaml
````

To deploy service into minikube, execute the command


````bash
helmfile sync

Building dependency release=api-node, chart=charts/api-node
Affected releases are:
  api-node (charts/api-node) UPDATED

Upgrading release=api-node, chart=charts/api-node
Release "api-node" does not exist. Installing it now.
NAME: api-node
LAST DEPLOYED: Tue Jan 18 21:20:15 2022
NAMESPACE: default
STATUS: deployed
REVISION: 1
NOTES:

1. Get the application URL by running these commands:
  export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=api-node,app.kubernetes.io/instance=api-node" -o jsonpath="{.items[0].metadata.name}")
  export CONTAINER_PORT=$(kubectl get pod --namespace default $POD_NAME -o jsonpath="{.spec.containers[0].ports[0].containerPort}")
  echo "Visit http://127.0.0.1:8080 to use your application"
  kubectl --namespace default port-forward $POD_NAME 8080:$CONTAINER_PORT

Listing releases matching ^api-node$
api-node        default         1               2022-01-18 21:20:15.785436 -0300 -03    deployed        api-node-1.0.0  1.0.0      


UPDATED RELEASES:
NAME       CHART             VERSION
api-node   charts/api-node     1.0.0

````

Once the execution is completed, you can verify the status with the following command:

````bash
helm ls --filter api-node

NAME            NAMESPACE       REVISION        UPDATED                                 STATUS          CHART           APP VERSION
api-node        default         1               2022-01-18 21:20:15.785436 -0300 -03    deployed        api-node-1.0.0  1.0.0

````

Finally, you use a kubectl command to check the pods for the service. Make sure they're on Running.

````bash
kubectl get pods

NAME                        READY   STATUS    RESTARTS   AGE
api-node-74cfcdbd84-m2jzn   1/1     Running   0          2m44s
````

We can check the logs of the pods as well. For that we use the kubectl command. We should see the message **Server started on 8080**

````bash
kubectl logs pod/api-node-74cfcdbd84-m2jzn

> api-node@1.0.0 start
> node ./src/index.js

Server started on port 8080
````

After this, the service will be deployed and it's up and running. Now, to access the service inside the pod, we can use again the kubectl command to forward the port to our local machine and test the service.

````bash
kubectl port-forward pod/api-node-74cfcdbd84-m2jzn 8080:8080 

Forwarding from 127.0.0.1:8080 -> 8080
Forwarding from [::1]:8080 -> 8080

````

From the terminal, we can execute this commmand to check the service we've just installed. We can use other programs for the same purpose, like podman or soapUI

````bash
curl http://localhost:8080/health
````

We should see a response in json format.

````json
{
   "date":"2022-01-18T21:28:38.856Z",
   "name":"api-node",
   "meta":{
      "branch":"master",
      "version":"v1.0"
   },
   "operation":"HealthCheck",
   "result":"ok",
   "code":200,
   "message":"Service ApiNode started",
   "data": []
}
````

End