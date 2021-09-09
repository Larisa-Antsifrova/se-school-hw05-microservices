require('dotenv').config();
const axios = require('axios');

const app = require('../app');
const { Ports } = require('../helpers/constants');
const { SERVICE_REGISTRY_URL } = process.env;

const PORT = process.env.PORT || Ports.default;

const server = app.listen(0, () => {
  const registerService = () =>
    axios.put(
      `${SERVICE_REGISTRY_URL}/register/auth-service/${server.address().port}`,
    );

  const unregisterService = () =>
    axios.delete(
      `${SERVICE_REGISTRY_URL}/unregister/auth-service/${
        server.address().port
      }`,
    );

  registerService();

  console.log(`Server is running on port ${PORT}`);

  const interval = setInterval(registerService, 20 * 1000);

  const cleanup = async () => {
    clearInterval(interval);
    await unregisterService();
  };

  process.on('SIGTERM', () => {
    cleanup();
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
    });
  });

  process.on('SIGINT', () => {
    cleanup();
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
    });
  });
});
