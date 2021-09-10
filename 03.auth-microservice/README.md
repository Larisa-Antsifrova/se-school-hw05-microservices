# AUTH Microservice

## Description

- The ports are assigned dynamically.
- Once the microservice is up, it sends an HTTP request to Service Registry to register itself with current IP and port.
- The microservice receives requests from API Gateway and replies back.

## Location in the app's architecture

![Microservices Architecture](./microservices-auth-service.png)

## Structure

| File/Folder  | Description                                                           |
| :----------- | :-------------------------------------------------------------------- |
| app.js       | Microservice's app                                                    |
| bin          | Server set up and listening                                           |
| controllers  | Endpoints' handlers                                                   |
| db           | Two file system database                                              |
| exceptions   | Class to generate custom API errors                                   |
| fs_odm       | Layer to work directly with file system                               |
| helpers      | Project's constants                                                   |
| registration | Script for the microservice to register itself with Service Registery |
| repositories | CRUD methods to work with database collections                        |
| routes       | Endpoints                                                             |
| service      | Classes to work with app's services                                   |
| .example.env | Info about expected environment variables                             |
