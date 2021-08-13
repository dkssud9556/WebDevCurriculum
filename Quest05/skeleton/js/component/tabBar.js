class TabBar {
  #tabSection;
  #tabList = [];
  #selectedTab;

  constructor(parent) {
    this.#tabSection = this.#createSection(parent);
  }

  #createSection = (parent) => {
    return ElementCreator.create({tag: 'section', classList: ['tab'], parent});
  }

  setSelectedTabSaved = () => {
    this.#selectedTab?.classList.remove('tab-component-unsaved');
  }

  updateTabName = (fileName) => {
    const index = this.#tabList.findIndex(tabInfo => tabInfo.element === this.#selectedTab);
    this.#tabList[index].fileName = fileName;
    this.#tabList[index].saved = true;
    this.#selectedTab.children[0].textContent = fileName;
    this.setSelectedTabSaved();
  }

  isExistsTabByFileName = (fileName) => {
    return this.#tabList.find(tabInfo => tabInfo.fileName === fileName);
  }

  changeSelectedTab = (tabComponent) => {
    this.#selectedTab?.classList.remove('tab-component-selected');
    this.#selectedTab = tabComponent;
    tabComponent.classList.add('tab-component-selected');
  }

  openNewTab = ({fileName = 'newfile', content = '', saved = false}) => {
    const newTab = this.#createNewTabComponent(fileName);
    this.#tabSection.appendChild(newTab);
    this.#tabList.push({fileName, content, saved, element: newTab});
    this.changeSelectedTab(newTab);
  }

  getSelectedTabInfo = () => {
    return this.#tabList.find(tabInfo => tabInfo.element === this.#selectedTab);
  }

  getTabInfoByFileName = (fileName) => {
    return this.#tabList.find(tabInfo => tabInfo.fileName === fileName);
  }

  updateSelectedTabContent = (content) => {
    const index = this.#tabList.findIndex(tabInfo => tabInfo.element === this.#selectedTab);
    this.#tabList[index].content = content;
    this.#selectedTab.classList.add('tab-component-unsaved');
  }

  #createNewTabComponent = (fileName) => {
    const fileNameSpan = ElementCreator.create({tag: 'span', textContent: fileName});
    const closeButton = ElementCreator.create({tag: 'button', textContent: 'X'});
    const tabComponent = ElementCreator.create({classList: ['tab-component'], children: [fileNameSpan, closeButton]});
    closeButton.onclick = this.#onClickCloseButton(tabComponent);
    tabComponent.onclick = this.#onClickTabComponent(tabComponent);
    return tabComponent;
  }

  #onClickCloseButton = (tabComponent) => (e) => {
    e.stopPropagation();
    this.#tabList = this.#tabList.filter(tabInfo => tabInfo.element !== tabComponent);
    this.#tabSection.removeChild(tabComponent);
  }

  #onClickTabComponent = (tabComponent) => (e) => {
    const tabInfo = this.#tabList.find(tabInfo => tabInfo.element === tabComponent);
    this.changeSelectedTab(tabComponent);
    EventManager.emit(e, 'setTextAreaValue', tabInfo);
  }
}