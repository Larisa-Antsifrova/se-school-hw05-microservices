require('dotenv').config();
const coinlayer = require('../http/axios-coinlayer');
const ApiError = require('../exceptions/api-errors');

const { COINLAYER_API_KEY } = process.env;

class CoinlayerProvider {
  constructor({ http, apiKey, errorHandler }) {
    this.http = http;
    this.apiKey = apiKey;
    this.errorHandler = errorHandler;
  }

  async fetchRate() {
    try {
      const { data } = await this.http.get('/live', {
        params: {
          access_key: this.apiKey,
          target: 'UAH',
          symbols: 'BTC',
        },
      });

      if (!data.success) {
        throw new this.errorHandler({
          message: data.error.type,
        });
      }

      const { timestamp, target, rates } = data;

      return { timestamp, target, rates };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CoinlayerProvider({
  http: coinlayer,
  apiKey: COINLAYER_API_KEY,
  errorHandler: ApiError,
});
