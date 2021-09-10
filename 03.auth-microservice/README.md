# AUTH Microservice

## Description

- When the app is launched, the ports are assigned dynamically.
- Once the microservice is up, it sends HTTP request to Service Registry to register itself with current ip and port.
- The microservice receives requests from API Gateway and replies back.

## Location in the app's architecture

![Microservices Architecture](./microservices-auth-service.png)

## Structure

| File/Folder  | Description                                                           |
| :----------- | :-------------------------------------------------------------------- |
| app.js       | Microservices's app                                                   |
| bin          | Server set up and listening                                           |
| controllers  | Endpoints' handlers                                                   |
| db           | Two file system database                                              |
| exceptions   | Class to generate custom api errors                                   |
| fs_odm       | Layer to work directly with file system                               |
| helpers      | Project's constants                                                   |
| registration | Script for the microservice to register itself with Service Registery |
| repositories | CRUD methods to work with database collections                        |
| routes       | Endpoints                                                             |
| service      | Classes to work with app's services                                   |
| .example.env | Info about expected environment variables                             |
