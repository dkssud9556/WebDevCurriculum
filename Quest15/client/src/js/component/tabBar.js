class TabBar {
  #tabBarDOM;

  #tabMap = new Map();

  #selectedTab;

  constructor(parent) {
    this.#tabBarDOM = this.#createSection(parent);
  }

  #createSection = (parent) => ElementCreator.create({
    tag: 'section',
    classList: ['tab'],
    parent,
  });

  removeTab = (tab) => {
    if (this.#selectedTab.fileName === tab.fileName) {
      this.#selectedTab = null;
    }
    this.#tabMap.delete(tab.fileName);
    tab.remove();
  };

  setSelectedTabSaved = () => {
    this.#selectedTab?.setSaved();
  };

  updateNewFileTabName = (newFileName) => {
    this.#tabMap.delete('newfile');
    this.#selectedTab.updateFileName(newFileName);
    this.#selectedTab.updateSaved(true);
    this.#tabMap.set(newFileName, this.#selectedTab);
    this.setSelectedTabSaved();
  };

  isExistsTabByFileName = (fileName) => this.#tabMap.has(fileName);

  changeSelectedTab = (fileName) => {
    this.#selectedTab?.unselect();
    this.#selectedTab = this.#tabMap.get(fileName);
    this.#selectedTab.select();
  };

  openNewTab = ({ fileName = 'newfile', content = '', saved = false }) => {
    const newTab = this.#createNewTab({ fileName, content, saved });
    this.#tabMap.set(fileName, newTab);
    this.changeSelectedTab(fileName);
  };

  getSelectedTab = () => this.#selectedTab;

  getTabByFileName = (fileName) => this.#tabMap.get(fileName);

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

  getOpenTabs = () => Array.from(this.#tabMap.keys());

  #createNewTab = ({
    fileName,
    content,
    saved,
  }) => new Tab(this.#tabBarDOM, { fileName, content, saved });
}
