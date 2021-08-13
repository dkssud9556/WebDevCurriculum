class TabBar {
  #tabSection;
  #tabMap = new Map();
  #selectedTab;

  constructor(parent) {
    this.#tabSection = this.#createSection(parent);
    this.#tabSection.addEventListener('selectTab', e => this.changeSelectedTab(e.detail.fileName));
    this.#tabSection.addEventListener('removeTab', this.#onRemoveTab)
  }

  #createSection = (parent) => {
    return ElementCreator.create({tag: 'section', classList: ['tab'], parent});
  }

  #onRemoveTab = (e) => {
    this.#tabMap.delete(e.detail.fileName);
    this.#tabSection.removeChild(e.detail.tab);
  }

  setSelectedTabSaved = () => {
    this.#selectedTab?.setSaved();
  }

  updateTabName = (newFileName) => {
    this.#tabMap.delete('newfile');
    this.#selectedTab.updateFileName(newFileName);
    this.#selectedTab.updateSaved(true);
    this.#tabMap.set(newFileName, this.#selectedTab);
    this.setSelectedTabSaved();
  }

  isExistsTabByFileName = (fileName) => {
    return this.#tabMap.has(fileName);
  }

  changeSelectedTab = (fileName) => {
    this.#selectedTab?.unselect();
    this.#selectedTab = this.#tabMap.get(fileName);
    this.#selectedTab.select();
  }

  openNewTab = ({fileName = 'newfile', content = '', saved = false}) => {
    const newTab = this.#createNewTab({fileName, content, saved});
    this.#tabMap.set(fileName, newTab);
    this.changeSelectedTab(fileName);
  }

  getSelectedTab = () => {
    return this.#selectedTab;
  }

  getTabByFileName = (fileName) => {
    return this.#tabMap.get(fileName);
  }

  updateSelectedTabContent = (content) => {
    this.#selectedTab.updateContent(content);
    this.#selectedTab.setUnsaved();
  }

  #createNewTab = ({fileName, content, saved}) => {
    return new Tab(this.#tabSection, {fileName, content, saved});
  }
}