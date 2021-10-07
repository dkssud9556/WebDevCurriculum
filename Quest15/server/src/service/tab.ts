import TabRepository from '@repository/tab';
import { Service } from 'typedi';

@Service()
export default class TabService {
  private readonly tabRepository: TabRepository;

  constructor(tabRepository: TabRepository) {
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
