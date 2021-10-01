import TabRepository from '@repository/tab';

export default class TabService {
  private readonly tabRepository: TabRepository;

  constructor(tabRepository: TabRepository) {
    this.tabRepository = tabRepository;
  }

  async getTabs(username: string) {
    return this.tabRepository.findAllByUsername(username);
  }

  async updateTabStatus(tabStatus: { username: string, openTabs: string[], selectedTab: string}) {
    await this.tabRepository.save(tabStatus);
  }
}
