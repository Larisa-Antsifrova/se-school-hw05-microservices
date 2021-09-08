const userRouter = require('express').Router();
const UserControllers = require('../controllers/user-controllers');

const userControllers = new UserControllers();

userRouter.get('/user/current', userControllers.get);

module.exports = userRouter;
