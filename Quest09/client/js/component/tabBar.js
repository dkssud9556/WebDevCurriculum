class TabBar {
  #tabBarDOM;
  #tabMap = new Map();
  #selectedTab;

  constructor(parent) {
    this.#tabBarDOM = this.#createSection(parent);
    this.#tabBarDOM.addEventListener("removeTab", this.#onRemoveTab);
  }

  #createSection = (parent) => {
    return ElementCreator.create({
      tag: "section",
      classList: ["tab"],
      parent,
    });
  };

  #onRemoveTab = (e) => {
    this.removeTab(e.detail.tab);
  };

  removeTab = (tab) => {
    this.#tabMap.delete(tab.fileName);
    tab.remove();
  };

  setSelectedTabSaved = () => {
    this.#selectedTab?.setSaved();
  };

  updateTabName = (newFileName) => {
    this.#tabMap.delete("newfile");
    this.#selectedTab.updateFileName(newFileName);
    this.#selectedTab.updateSaved(true);
    this.#tabMap.set(newFileName, this.#selectedTab);
    this.setSelectedTabSaved();
  };

  isExistsTabByFileName = (fileName) => {
    return this.#tabMap.has(fileName);
  };

  changeSelectedTab = (fileName) => {
    this.#selectedTab?.unselect();
    this.#selectedTab = this.#tabMap.get(fileName);
    this.#selectedTab.select();
  };

  openNewTab = ({ fileName = "newfile", content = "", saved = false }) => {
    const newTab = this.#createNewTab({ fileName, content, saved });
    this.#tabMap.set(fileName, newTab);
    this.changeSelectedTab(fileName);
  };

  getSelectedTab = () => {
    return this.#selectedTab;
  };

  getTabByFileName = (fileName) => {
    return this.#tabMap.get(fileName);
  };

  updateSelectedTabContent = (content) => {
    this.#selectedTab.updateContent(content);
    this.#selectedTab.setUnsaved();
  };

  renameTab = ({ fileName, newFileName }) => {
    const tab = this.getTabByFileName(fileName);
    this.#tabMap.delete(fileName);
    tab.updateFileName(newFileName);
    this.#tabMap.set(newFileName, tab);
  };

  #createNewTab = ({ fileName, content, saved }) => {
    return new Tab(this.#tabBarDOM, { fileName, content, saved });
  };
}
