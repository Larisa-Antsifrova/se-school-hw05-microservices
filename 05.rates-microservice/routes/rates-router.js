const ratesRouter = require('express').Router();

const RatesControllers = require('../controllers/rates-controllers');
const RatesService = require('../service/rates-service');
const ApiError = require('../exceptions/api-errors');
const CoinlayerProvider = require('../provider/coinlayer-provider');

const ratesService = new RatesService({
  provider: CoinlayerProvider,
  errorHandler: ApiError,
});
const ratesControllers = new RatesControllers(ratesService);

ratesRouter.get('/rates', ratesControllers.getRate.bind(ratesControllers));

module.exports = ratesRouter;
