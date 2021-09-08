const { v4: uuid } = require('uuid');
const path = require('path');

const userRouter = require('express').Router();
const UserControllers = require('../controllers/user-controllers');
const UserRepository = require('../repositories/users-repository');
const FsMapper = require('../fs_odm/fs-db-mapper');

const usersPath = path.join(__dirname, '..', 'db', 'users.json');
const fsMapper = new FsMapper(usersPath);
const userRepository = new UserRepository({
  mapper: fsMapper,
  idGenerator: uuid,
});

const userControllers = new UserControllers(userRepository);

userRouter.get('/user/:userId', userControllers.get.bind(userControllers));

userRouter.post('/user/create', userControllers.create.bind(userControllers));

module.exports = userRouter;
