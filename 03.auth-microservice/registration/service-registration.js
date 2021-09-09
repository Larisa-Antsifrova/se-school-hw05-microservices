const axios = require('axios');

const { SERVICE_REGISTRY_URL } = process.env;

class ServiceRegistration {
  registerService(server) {
    axios.put(
      `${SERVICE_REGISTRY_URL}/register/auth-service/${server.address().port}`,
    );
  }

  unregisterService(server) {
    axios.delete(
      `${SERVICE_REGISTRY_URL}/unregister/auth-service/${
        server.address().port
      }`,
    );
  }
}

module.exports = ServiceRegistration;
