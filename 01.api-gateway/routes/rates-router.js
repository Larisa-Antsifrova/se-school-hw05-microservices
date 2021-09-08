const ratesRouter = require('express').Router();
const RatesControllers = require('../controllers/rates-controllers');

const ratesControllers = new RatesControllers();

ratesRouter.get('/rates', ratesControllers.getRate);

module.exports = ratesRouter;
