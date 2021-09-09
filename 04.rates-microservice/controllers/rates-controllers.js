class RatesControllers {
  constructor(service) {
    this.service = service;
  }

  async getRate(req, res, next) {
    try {
      const rates = await this.service.getRate();

      return res.json({ ...rates });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RatesControllers;
