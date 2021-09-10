![Banner](./tools-banner.png)

# SE School - HW05 - Microservices

Current project presents a system of:

- API Gateway
- Service Registry
- Auth Microservice
- Rates Microservice

The homework's goal is:

- to extract a Rates service into its separate microservice

The homework's motto:

- _...Software is made of feelings. (с) A.A._

P.s. For the education purposes, separate microservices are stored in one GitHub repository. Detailes about each component are provided in corresponding Readme files in each subdirectory.

## Note to code reviewer

Hi Andrii!  
&nbsp;
WORK IN PROGRESS...

## Project's architecture overview

![Microservices Architecture](./microservices-overview.png)

## Setting up the app locally

WORK IN PROGRESS...

## Endpoints

Here are the endpoints to explore:

### /auth/signup - Registering a new user

Registers new users.

- Name, email and password are required.
- The fields are validated with Joi library.
- If the email is already in use, the error of conflict is returned.
- If validation is successful and email is unique, the password is hashed and the new user is saved in database.
- No authentication token is returned in case verification stage will be added (for example, verification via e-mail).

#### Registration request example

```shell

POST /user/create
Content-Type: application/json
RequestBody: {
  "name": "Software Engineering School",
  "email": "software@engineering.school",
  "password": "ses123456"
}

```

### /auth/login - Logging in a user

Authenticates a user.

- Email and password are required.
- The fields are validated only for their presence.
- If a user with the provided e-mail and/or password does not exist in database, general error message is returned.
- If validation is successful and credentials are right, the JSON Web Token is created and returned.
- JWT has limited life span.

#### Login request example

```shell

POST /user/login
Content-Type: application/json
RequestBody: {
  "email": "software@engineering.school",
  "password": "ses123456"
}

```

### /rates - Getting current BTC to UAH rate information

Provides current rate of BTC to UAH.

- The endpoint is available only for authenticated users.
- isAuthenticated middleware verifies JWT in Authorization header (Bearer token).
- If the provided JWT is valid the endpoint returns current rate of 1 BTC to UAH.
- [Coinlayer API](https://coinlayer.com/documentation) is used to get the rate.

#### Current BTC to UAH rate request example

```shell

GET /rates

```
