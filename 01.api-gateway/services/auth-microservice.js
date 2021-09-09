const axios = require('axios');

class AuthMicroService {
  constructor({ serviceRegistryUrl }) {
    this.serviceRegistryUrl = serviceRegistryUrl;
    this.serviceName = 'auth-microservice';
  }

  async getRate() {
    const { ip, port } = await this.getService();

    return await this.callService({
      method: 'get',
      url: `http://${ip}:${port}/rates`,
    });
  }

  async signup({ name, email, password }) {
    const { ip, port } = await this.getService();

    return await this.callService({
      method: 'post',
      data: { name, email, password },
      url: `http://${ip}:${port}/auth/signup`,
    });
  }

  async login({ email, password }) {
    const { ip, port } = await this.getService();

    return await this.callService({
      method: 'post',
      data: { email, password },
      url: `http://${ip}:${port}/auth/login`,
    });
  }

  async verify(token) {
    const { ip, port } = await this.getService();

    return await this.callService({
      method: 'post',
      data: { token },
      url: `http://${ip}:${port}/auth/verify`,
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

module.exports = AuthMicroService;
