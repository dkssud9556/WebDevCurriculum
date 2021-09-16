import { users } from "../user/memory.js";

const tabs = users.map((user) => ({
  username: user.username,
  openTabs: [],
  selectedTab: null,
}));

class MemoryTabRepository {
  async findByUsername(username) {
    return tabs.find((tab) => tab.username === username) ?? null;
  }

  async save({ username, openTabs, selectedTab }) {
    const index = tabs.findIndex((tab) => tab.username === username);
    tabs[index].openTabs = openTabs;
    tabs[index].selectedTab = selectedTab;
  }
}

export default new MemoryTabRepository();
