const authRouter = require('express').Router();
const AuthControllers = require('../controllers/auth-controllers');

const authControllers = new AuthControllers();

authRouter.post('/auth/signup', authControllers.signup);

authRouter.post('/auth/login', authControllers.login);

authRouter.post('/auth/logout', authControllers.logout);

module.exports = authRouter;
