const { HttpCodes, Messages } = require('../helpers/constants');

class AuthService {
  constructor({ repository, passwordService, tokenService, errorHandler }) {
    this.repository = repository;
    this.passwordService = passwordService;
    this.tokenService = tokenService;
    this.errorHandler = errorHandler;
  }

  async signup({ name, email, password }) {
    try {
      const doesAlreadyExist = await this.repository.getUserBy('email', email);

      if (doesAlreadyExist) {
        throw new this.errorHandler({
          status: HttpCodes.CONFLICT,
          message: Messages.emailConflict,
        });
      }

      const hashedPassword = await this.passwordService.hash(password);

      return await this.repository.addNewUser({
        name,
        email,
        password: hashedPassword,
      });
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const user = await this.repository.getUserBy('email', email);

      if (!user) {
        throw new this.errorHandler({
          status: HttpCodes.UNAUTHORIZED,
          message: Messages.invalidCreds,
        });
      }

      const isPasswordCorrect = await this.passwordService.compare(
        password,
        user.password,
      );

      if (!isPasswordCorrect) {
        throw new this.errorHandler({
          status: HttpCodes.UNAUTHORIZED,
          message: Messages.invalidCreds,
        });
      }

      const { id, name, email: userEmail } = user;

      const token = this.tokenService.generate({
        id,
        name,
        email: userEmail,
      });

      return { id, name, email: userEmail, token };
    } catch (error) {
      throw error;
    }
  }

  async verify(token) {
    return this.tokenService.verify(token);
  }
}

module.exports = AuthService;
