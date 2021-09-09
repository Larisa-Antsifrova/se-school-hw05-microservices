const ApiError = require('../exceptions/api-errors');
const { HttpCodes, Messages } = require('../helpers/constants');
const { authMicroService } = require('../routes/auth-router');

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ApiError({
        status: HttpCodes.UNAUTHORIZED,
        message: Messages.noJWT,
      });
    }

    await authMicroService.verify(token);

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isAuthenticated };
