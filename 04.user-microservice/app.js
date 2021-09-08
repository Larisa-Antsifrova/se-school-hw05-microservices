const express = require('express');

const userRouter = require('./routes/user-router');
const { HttpCodes, Messages } = require('./helpers/constants');

const app = express();

app.use(express.json());

app.use(userRouter);

app.use((req, res) => {
  return res.status(HttpCodes.NOT_FOUND).json({ message: Messages.notFound });
});

app.use((err, req, res, next) => {
  const status = err.status || HttpCodes.INTERNAL_SERVER_ERROR;

  return res.status(status).json({
    message: err.message,
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;
