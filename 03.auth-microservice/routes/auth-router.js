require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authRouter = require('express').Router();

const AuthService = require('../service/auth-service');
const PasswordService = require('../service/password-service');
const TokenService = require('../service/jwt-token-service');
const ApiError = require('../exceptions/api-errors');
const AuthControllers = require('../controllers/auth-controllers');

const { JWT_SECRET_KEY } = process.env;

const tokenService = new TokenService({
  jwtProvider: jwt,
  secretKey: JWT_SECRET_KEY,
  errorHandler: ApiError,
});

const passwordService = new PasswordService(bcrypt);

const authService = new AuthService({
  passwordService: passwordService,
  tokenService: tokenService,
  errorHandler: ApiError,
});

const authControllers = new AuthControllers(authService);

authRouter.post('/auth/signup', authControllers.signup.bind(authControllers));

authRouter.post('/auth/login', authControllers.login.bind(authControllers));

authRouter.post('/auth/logout', authControllers.logout.bind(authControllers));

module.exports = authRouter;
