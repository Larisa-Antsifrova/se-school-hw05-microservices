require('dotenv').config();

const app = require('../app');
const { Ports } = require('../helpers/constants');

const PORT = process.env.PORT || Ports.default;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  app.close(() => {
    console.log('HTTP server closed');
  });
});
