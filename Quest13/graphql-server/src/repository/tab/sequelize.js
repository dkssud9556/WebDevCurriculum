import sequelize from "../../model/index.js";

class SequelizeTabRepository {
  #TabModel;

  constructor(TabModel) {
    this.#TabModel = TabModel;
  }

  async findByUsername(username) {
    const tabs = await this.#TabModel.findAll({ where: { username } });
    return {
      username,
      selectedTab:
        tabs.find((tab) => tab.isSelected === true)?.fileName ?? null,
      openTabs: tabs.map((tab) => tab.fileName),
    };
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
