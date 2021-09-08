const { HttpCodes } = require('../helpers/constants');
class UserControllers {
  constructor(repository) {
    this.repository = repository;
  }

  async get(req, res, next) {
    try {
      const { userId } = req.params;

      const user = await this.repository.getUserBy('id', userId);

      return res.json({ user });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const user = await this.repository.addNewUser({ name, email, password });

      return res.status(HttpCodes.CREATED).json({ user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserControllers;
