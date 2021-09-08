const { HttpCodes, Messages } = require('../helpers/constants');

class AuthControllers {
  constructor(authService) {
    this.authService = authService;
  }

  async signup(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const user = await this.authService.signup({ name, email, password });

      return res.status(HttpCodes.CREATED).json({
        message: Messages.registrationSuccess,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await this.authService.login({ email, password });

      return res.status(HttpCodes.OK).json({
        message: Messages.loginSuccess,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      await this.authService.logout();

      return res.status(HttpCodes.NO_CONTENT).json({});
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthControllers;
