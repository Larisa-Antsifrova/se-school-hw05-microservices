require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const authRouter = require('express').Router();

const AuthService = require('../service/auth-service');
const PasswordService = require('../service/password-service');
const TokenService = require('../service/jwt-token-service');
const UsersRepository = require('../repositories/users-repository');
const FsDbMapper = require('../fs_odm/fs-db-mapper');
const ApiError = require('../exceptions/api-errors');
const AuthControllers = require('../controllers/auth-controllers');

const { JWT_SECRET_KEY } = process.env;
const dbPath = path.join(__dirname, '..', 'db', 'users.json');

const fsDbMapper = new FsDbMapper(dbPath);

const usersRepository = new UsersRepository({
  mapper: fsDbMapper,
  idGenerator: uuidv4,
});

const tokenService = new TokenService({
  jwtProvider: jwt,
  secretKey: JWT_SECRET_KEY,
  errorHandler: ApiError,
});
const passwordService = new PasswordService(bcrypt);

const authService = new AuthService({
  repository: usersRepository,
  passwordService: passwordService,
  tokenService: tokenService,
  errorHandler: ApiError,
});

const authControllers = new AuthControllers(authService);

authRouter.post('/auth/signup', authControllers.signup.bind(authControllers));

authRouter.post('/auth/login', authControllers.login.bind(authControllers));

authRouter.post('/auth/verify', authControllers.verify.bind(authControllers));

module.exports = authRouter;
