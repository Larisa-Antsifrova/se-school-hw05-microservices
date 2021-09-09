class RatesControllers {
  constructor(microservice) {
    this.microservice = microservice;
  }

  async getRate(req, res, next) {
    try {
      const rates = await this.microservice.getRate();

      return res.json({ ...rates });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RatesControllers;
