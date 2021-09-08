const { HttpCodes, TokenLife } = require('../helpers/constants');

class TokenService {
  constructor({ jwtProvider, secretKey, errorHandler }) {
    this.jwtProvider = jwtProvider;
    this.secretKey = secretKey;
    this.errorHandler = errorHandler;
  }

  generate(payload) {
    return this.jwtProvider.sign(payload, this.secretKey, {
      expiresIn: TokenLife.access,
    });
  }

  verify(token) {
    try {
      return this.jwtProvider.verify(token, this.secretKey);
    } catch (error) {
      throw new this.errorHandler({
        status: HttpCodes.UNAUTHORIZED,
        message: error.message,
      });
    }
  }
}

module.exports = TokenService;
