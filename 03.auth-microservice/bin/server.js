require('dotenv').config();

const app = require('../app');
const { name } = require('../package.json');
const ServiceRegistration = require('../registration/service-registration');

const serviceRegistration = new ServiceRegistration();

const server = app.listen(0, () => {
  serviceRegistration.registerService(server, name);

  console.log(`Server is running on port ${server.address().port}`);

  const interval = setInterval(
    () => serviceRegistration.registerService(server, name),
    20 * 1000,
  );

  process.on('SIGTERM', () => {
    serviceRegistration.cleanup(server, interval, name);

    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
    });
  });

  process.on('SIGINT', () => {
    serviceRegistration.cleanup(server, interval, name);

    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
    });
  });
});
