import sequelize from "../../model/index.js";

class SequelizeUserRepository {
  #UserModel;

  constructor(UserModel) {
    this.#UserModel = UserModel;
  }

  async findByUsername(username) {
    return this.#UserModel.findByPk(username);
  }

  async save({ username, password }) {
    await this.#UserModel.create({ username, password });
  }
}

export default new SequelizeUserRepository(sequelize.models.User);
