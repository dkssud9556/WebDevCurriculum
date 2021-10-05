import { TabModel} from "@model/tab";
import Tab from "@entity/tab";
import TabRepository from "@repository/tab/index";
import {Op} from "sequelize";

export default class SequelizeTabRepository implements TabRepository {
  async findAllByUsername(username: string): Promise<Tab[]> {
    const tabs = await TabModel.findAll({ where: { username } });
    return tabs.map(tab => {
      const { fileName, username, isSelected} = tab;
      return new Tab(fileName, username, isSelected);
    });
  }

  async save({username, openTabs, selectedTab}: { username: string; openTabs: string[]; selectedTab: string }): Promise<void> {
    await TabModel.destroy({ where: { username }});
    await TabModel.bulkCreate(
        openTabs.map((tabName) => ({
          username,
          fileName: tabName,
          isSelected: selectedTab === tabName
        }))
    )
  }

  async findAllIn(usernames: readonly string[]): Promise<Tab[]> {
      const tabs = await TabModel.findAll({ where: { username: { [Op.in]: usernames}}})
      return tabs.map(tab => {
          const {fileName, username, isSelected} = tab;
          return new Tab(fileName, username, isSelected)
      })
  }
}
