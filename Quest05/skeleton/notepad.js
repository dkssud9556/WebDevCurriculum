class Notepad {
  #notepadSection;
  #explorer;
  #tab;
  #textArea;
  #storage;

  constructor(storage) {
    this.#storage = storage;
    this.#renderSections();
    this.#explorer.loadFiles({storage, tab: this.#tab, textArea: this.#textArea});
    document.onkeydown = this.#onDocumentKeydown;
    this.#textArea.element.onkeydown = e => {
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        const selectedTab = document.querySelector('.tab-component-selected');
        const tabInfo = this.#tab.getTabInfoByTabComponent(selectedTab);
        if (tabInfo.saved) {
          this.#storage.save(tabInfo);
        } else {
          const fileName = prompt('저장할 파일명을 입력해주세요.');
          if (this.#storage.isExistsFileName(fileName)) {
            return alert('파일명이 중복되었습니다.');
          }
          this.#storage.updateFileNames(fileName);
          this.#storage.save({...tabInfo, fileName});
          this.#explorer.loadFile({storage: this.#storage, tab: this.#tab, textArea: this.#textArea, fileName});
        }
        document.querySelector('.tab-component-selected')?.classList.remove('tab-component-unsaved');
      }
    }
  }

  #renderSections = () => {
    this.#tab = new Tab();
    this.#explorer = new Explorer();
    this.#textArea = new TextArea({tab: this.#tab, storage: this.#storage});
    this.#notepadSection = ElementCreator.create({
      tag: 'section',
      classList: ['notepad'],
      children: [this.#explorer.element, this.#tab.element, this.#textArea.element]
    });
    document.body.appendChild(this.#notepadSection);
  }

  #onDocumentKeydown = e => {
    if (e.key === 'n' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (this.#tab.isExistsTabByFileName('newfile')) {
        return;
      }
      const newTab = this.#tab.openNewTab({saved: false, textArea: this.#textArea});
      this.#tab.changeSelectedTab(newTab);
      this.#textArea.setValue('');
    }
  }
}

class LocalStorage {
  getFileContentByName(fileName) {
    return localStorage.getItem('file:' + fileName);
  }

  save({fileName, content}) {
    localStorage.setItem('file:' + fileName, content);
  }

  updateFileNames(fileName) {
    localStorage.setItem('fileNames', localStorage.getItem('fileNames') + ':' + fileName);
  }

  getFileNames() {
    return localStorage.getItem('fileNames').split(':');
  }

  isExistsFileName(fileName) {
    return this.getFileNames().find(v => v === fileName);
  }
}

class Explorer {
  #explorerSection;

  get element() {
    return this.#explorerSection;
  }

  constructor() {
    this.#explorerSection = this.#createSection();
  }

  #createSection = () => {
    return ElementCreator.create({tag: 'section', classList: ['explorer']});
  }

  loadFile = ({storage, tab, textArea, fileName}) => {
    const fileDiv = ElementCreator.create({textContent: fileName, classList: ['file']});
    fileDiv.onclick = () => {
      const tabInfo = tab.getTabInfoByFileName(fileName);
      if (tabInfo) {
        textArea.setValue(tabInfo.content);
        tab.changeSelectedTab(tabInfo.element);
      } else {
        const content = storage.getFileContentByName(fileName);
        textArea.setValue(content);
        const newTab = tab.openNewTab({fileName, content, saved: true, textArea});
        tab.changeSelectedTab(newTab);
      }
    };
    this.#explorerSection.appendChild(fileDiv);
  }

  loadFiles = ({storage, tab, textArea}) => {
    const fileNames = storage.getFileNames();
    fileNames.forEach(fileName => this.loadFile({storage, tab, textArea, fileName}));
  }
}

class Tab {
  #tabSection;
  #tabList = [];

  get element() {
    return this.#tabSection;
  }

  constructor() {
    this.#tabSection = this.#createSection();
  }

  #createSection = () => {
    return ElementCreator.create({tag: 'section', classList: ['tab']});
  }

  isExistsTabByFileName = (fileName) => {
    return this.#tabList.find(tabInfo => tabInfo.fileName === fileName);
  }

  changeSelectedTab = (tabComponent) => {
    document.querySelector('.tab-component-selected')?.classList.remove('tab-component-selected');
    tabComponent.classList.add('tab-component-selected');
  }

  openNewTab = ({fileName = 'newfile', content = '', saved, textArea}) => {
    const newTab = this.#createNewTabComponent({fileName, content, textArea});
    this.#tabSection.appendChild(newTab);
    this.#tabList.push({fileName, content, saved, element: newTab});
    return newTab;
  }

  getTabInfoByFileName = (fileName) => {
    return this.#tabList.find(tabInfo => tabInfo.fileName === fileName);
  }

  getTabInfoByTabComponent = (tabComponent) => {
    return this.#tabList.find(tabInfo => tabInfo.element === tabComponent);
  }

  updateContentByTabComponent = ({tabComponent, content}) => {
    const index = this.#tabList.findIndex(tabInfo => tabInfo.element === tabComponent);
    this.#tabList[index].content = content;
  }

  #createNewTabComponent = ({fileName, content, textArea}) => {
    const fileNameSpan = ElementCreator.create({tag: 'span', textContent: fileName});
    const closeButton = ElementCreator.create({tag: 'button', textContent: 'X'});
    const tabComponent = ElementCreator.create({classList: ['tab-component'], children: [fileNameSpan, closeButton]});
    closeButton.onclick = this.#onClickCloseButton(tabComponent);
    tabComponent.onclick = this.#onClickTabComponent({tabComponent, textArea});
    return tabComponent;
  }

  #onClickCloseButton = (tabComponent) => (e) => {
    e.stopPropagation();
    this.#tabList = this.#tabList.filter(tabInfo => tabInfo.element !== tabComponent);
    this.#tabSection.removeChild(tabComponent);
  }

  #onClickTabComponent = ({tabComponent, textArea}) => (e) => {
    const tabInfo = this.#tabList.find(tabInfo => tabInfo.element === tabComponent);
    textArea.setValue(tabInfo.content);
    this.changeSelectedTab(tabComponent);
  }
}

class TextArea {
  #textArea;
  #storage;

  get element() {
    return this.#textArea;
  }

  constructor({tab, storage}) {
    this.#storage = storage;
    this.#textArea = this.#createTextArea();
    this.#textArea.oninput = this.#setSelectedTabUnsaved(tab);
  }

  #createTextArea = () => {
    return ElementCreator.create({tag: 'textarea', classList: ['text-area']});
  }

  setValue = (content) => {
    this.#textArea.value = content;
  }

  #setSelectedTabUnsaved = (tab) => (e) => {
    const selectedTab = document.querySelector('.tab-component-selected');
    if (selectedTab) {
      tab.updateContentByTabComponent({tabComponent: selectedTab, content: this.#textArea.value});
      selectedTab.classList.add('tab-component-unsaved');
    }
  }
}

class ElementCreator {
  static create({tag = 'div', textContent = '', classList = [], children = []}) {
    const result = document.createElement(tag);
    result.classList.add(...classList);
    result.textContent = textContent;
    children.forEach(child => result.appendChild(child));
    return result;
  }
}
