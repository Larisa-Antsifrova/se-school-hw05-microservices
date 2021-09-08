const userRouter = require('express').Router();
const UserControllers = require('../controllers/user-controllers');

const userControllers = new UserControllers();

userRouter.get('/user/current', userControllers.get);

userRouter.post('/user/create', userControllers.create);

userRouter.put('/user/:userId', userControllers.update);

userRouter.delete('/user/:userId', userControllers.delete);

module.exports = userRouter;
