const registryRouter = require('express').Router();

const RegistryControllers = require('../controllers/registry-controllers');
const ServiceRegistry = require('../service/service-registry');

const serviceRegistry = new ServiceRegistry();
const registryControllers = new RegistryControllers(serviceRegistry);

registryRouter.put(
  '/register/:servicename/:serviceport',
  registryControllers.register.bind(registryControllers),
);

registryRouter.delete(
  '/unregister/:servicename/:serviceport',
  registryControllers.unregister.bind(registryControllers),
);

registryRouter.get(
  '/find/:servicename',
  registryControllers.find.bind(registryControllers),
);

module.exports = registryRouter;
