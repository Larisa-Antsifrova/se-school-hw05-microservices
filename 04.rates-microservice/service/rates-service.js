const { HttpCodes } = require('../helpers/constants');

class RatesService {
  constructor({ provider, errorHandler }) {
    this.provider = provider;
    this.errorHandler = errorHandler;
  }

  async getRate() {
    try {
      return await this.provider.fetchRate();
    } catch (error) {
      throw new this.errorHandler({
        status: HttpCodes.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}

module.exports = RatesService;
