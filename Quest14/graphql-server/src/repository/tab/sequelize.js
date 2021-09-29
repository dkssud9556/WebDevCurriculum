import Sequelize from "sequelize";

import sequelize from "../../model/index.js";

const { Op } = Sequelize;

class SequelizeTabRepository {
  #TabModel;

  constructor(TabModel) {
    this.#TabModel = TabModel;
  }

  async findAllByUsername(username) {
    return this.#TabModel.findAll({ where: { username } });
  }

  async findAllIn(usernames) {
    return this.#TabModel.findAll({
      where: { username: { [Op.in]: usernames } },
    });
  }

  async save({ username, openTabs, selectedTab }) {
    await this.#TabModel.destroy({ where: { username } });
    await this.#TabModel.bulkCreate(
      openTabs.map((tabName) => ({
        username,
        fileName: tabName,
        isSelected: selectedTab === tabName,
      }))
    );
  }
}

export default new SequelizeTabRepository(sequelize.models.Tab);
