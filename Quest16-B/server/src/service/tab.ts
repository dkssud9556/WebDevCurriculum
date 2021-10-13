import TabRepository from '@repository/tab';
import { Inject, Service } from 'typedi';
import SequelizeTabRepository from '@repository/tab/sequelize';

@Service()
export default class TabService {
  private readonly tabRepository: TabRepository;

  constructor(
      @Inject(() => SequelizeTabRepository) tabRepository: TabRepository,
  ) {
    this.tabRepository = tabRepository;
  }

  async getTabs(username: string) {
    return this.tabRepository.findAllByUsername(username);
  }

  async getTabsIn(usernames: readonly string[]) {
    return this.tabRepository.findAllIn(usernames as string[]);
  }

  async updateTabStatus(tabStatus: { username: string, openTabs: string[], selectedTab: string}) {
    await this.tabRepository.save(tabStatus);
  }
}
