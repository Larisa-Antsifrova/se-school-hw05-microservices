const axios = require('axios');

class RatesMicroService {
  constructor({ serviceRegistryUrl }) {
    this.serviceRegistryUrl = serviceRegistryUrl;
    this.serviceName = 'rates-microservice';
  }

  async getRate() {
    const { ip, port } = await this.getService();

    return await this.callService({
      method: 'get',
      url: `http://${ip}:${port}/rates`,
    });
  }

  async getService() {
    const { data } = await axios.get(
      `${this.serviceRegistryUrl}/find/${this.serviceName}`,
    );

    return data;
  }

  async callService(reqOptions) {
    const { data } = await axios(reqOptions);

    return data;
  }
}

module.exports = RatesMicroService;
