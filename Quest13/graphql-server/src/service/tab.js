import { tabRepository } from "../repository/index.js";

class TabService {
  #tabRepository;

  constructor(tabRepository) {
    this.#tabRepository = tabRepository;
  }

  async getTabStatus(username) {
    return this.#tabRepository.findByUsername(username);
  }

  async updateTabStatus({ username, openTabs, selectedTab }) {
    await this.#tabRepository.save({ username, openTabs, selectedTab });
  }
}

export default new TabService(tabRepository);
