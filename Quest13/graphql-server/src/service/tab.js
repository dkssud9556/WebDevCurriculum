import { tabRepository } from "../repository/index.js";

class TabService {
  #tabRepository;

  constructor(tabRepository) {
    this.#tabRepository = tabRepository;
  }

  async getTabs(username) {
    return this.#tabRepository.findAllByUsername(username);
  }

  async updateTabStatus({ username, openTabs, selectedTab }) {
    await this.#tabRepository.save({ username, openTabs, selectedTab });
  }
}

export default new TabService(tabRepository);
