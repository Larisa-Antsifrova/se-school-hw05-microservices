const userRouter = require('express').Router();
const UserControllers = require('../controllers/user-controllers');

const userControllers = new UserControllers();

userRouter.get('/user/current', userControllers.get);

userRouter.post('/user/create', userControllers.create);

module.exports = userRouter;
