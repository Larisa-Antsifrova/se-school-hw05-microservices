const axios = require('axios');

const { SERVICE_REGISTRY_URL } = process.env;

class ServiceRegistration {
  registerService(server, name) {
    axios.put(
      `${SERVICE_REGISTRY_URL}/register/${name}/${server.address().port}`,
    );
  }

  unregisterService(server, name) {
    axios.delete(
      `${SERVICE_REGISTRY_URL}/unregister/${name}/${server.address().port}`,
    );
  }

  async cleanup(server, intervalId) {
    clearInterval(intervalId);
    await this.unregisterService(server);
  }
}

module.exports = ServiceRegistration;
