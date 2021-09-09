require('dotenv').config();
const authRouter = require('express').Router();

const AuthMicroService = require('../services/auth-microservice');
const AuthControllers = require('../controllers/auth-controllers');
const {
  validateLoginUser,
  validateRegisterUser,
} = require('../middleware/validation');

const { SERVICE_REGISTRY_URL } = process.env;
const authMicroService = new AuthMicroService({
  serviceRegistryUrl: SERVICE_REGISTRY_URL,
});
const authControllers = new AuthControllers(authMicroService);

authRouter.post(
  '/auth/signup',
  validateRegisterUser,
  authControllers.signup.bind(authControllers),
);

authRouter.post(
  '/auth/login',
  validateLoginUser,
  authControllers.login.bind(authControllers),
);

module.exports = { authRouter, authMicroService };
