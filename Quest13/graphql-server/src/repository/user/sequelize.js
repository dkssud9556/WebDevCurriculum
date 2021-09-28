import sequelize from "../../model/index.js";
import Sequelize from "sequelize";

const { Op } = Sequelize;

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

  async findAllIn(usernames) {
    return this.#UserModel.findAll({
      where: { username: { [Op.in]: usernames } },
    });
  }
}

export default new SequelizeUserRepository(sequelize.models.User);
