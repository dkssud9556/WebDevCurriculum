import sequelize from "../../model/index.js";

class SequelizeUserRepository {
  #UserModel;

  constructor(UserModel) {
    this.#UserModel = UserModel;
  }

  async findByUsername(username) {
    return this.#UserModel.findByPk(username);
  }
}

export default new SequelizeUserRepository(sequelize.models.User);
