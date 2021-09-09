const { HttpCodes } = require('../helpers/constants');
class AuthControllers {
  constructor(microservice) {
    this.microservice = microservice;
  }

  async signup(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const response = await this.microservice.signup({
        name,
        email,
        password,
      });

      return res.status(HttpCodes.CREATED).json({ ...response });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const response = await this.microservice.login({ email, password });

      return res.status(HttpCodes.OK).json({
        ...response,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthControllers;
