require('dotenv').config();
const ratesRouter = require('express').Router();

const RatesMicroService = require('../services/rates-microservice');
const RatesControllers = require('../controllers/rates-controllers');
const { SERVICE_REGISTRY_URL } = process.env;

const ratesMicroService = new RatesMicroService({
  serviceRegistryUrl: SERVICE_REGISTRY_URL,
});
const ratesControllers = new RatesControllers(ratesMicroService);

ratesRouter.get('/rates', ratesControllers.getRate.bind(ratesControllers));

module.exports = ratesRouter;
