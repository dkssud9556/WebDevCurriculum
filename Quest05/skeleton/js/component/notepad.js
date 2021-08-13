class Notepad {
  #notepadSection;
  #explorer;
  #tabBar;
  #textArea;
  #storage;

  constructor(storage) {
    this.#storage = storage;
    this.#render();
    this.#notepadSection.addEventListener('setTextAreaValue', this.#onSetTextAreaValue);
    this.#notepadSection.addEventListener('contentModification', this.#onContentModification);
    this.#notepadSection.addEventListener('clickFile', this.#onClickFile);
    this.#notepadSection.addEventListener('saveFile', this.#onSaveFile);
    document.addEventListener('keydown', this.#onNewFile);
    this.#explorer.loadFiles(storage.getFileNames());
  }

  #render = () => {
    this.#notepadSection = ElementCreator.create({
      tag: 'section',
      classList: ['notepad']
    });
    this.#explorer = new Explorer(this.#notepadSection);
    this.#tabBar = new TabBar(this.#notepadSection);
    this.#textArea = new TextArea(this.#notepadSection);
    document.body.appendChild(this.#notepadSection);
  }

  #onNewFile = e => {
    if (e.key === 'n' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (this.#tabBar.isExistsTabByFileName('newfile')) {
        return;
      }
      this.#tabBar.openNewTab({saved: false, textArea: this.#textArea});
      this.#textArea.setValue('');
    }
  }

  #onSetTextAreaValue = e => {
    this.#textArea.setValue(e.detail.content);
  }

  #onContentModification = e => {
    this.#tabBar.updateSelectedTabContent(e.detail.content);
  }

  #onClickFile = e => {
    const tabInfo = this.#tabBar.getTabInfoByFileName(e.detail.fileName);
    if (tabInfo) {
      this.#selectExistentTab(tabInfo);
    } else {
      this.#openNewTab(e.detail.fileName);
    }
  }

  #selectExistentTab = (tabInfo) => {
    this.#textArea.setValue(tabInfo.content);
    this.#tabBar.changeSelectedTab(tabInfo.element);
  }

  #openNewTab = (fileName) => {
    const content = this.#storage.getFileContentByName(fileName);
    this.#textArea.setValue(content);
    this.#tabBar.openNewTab({fileName, content, saved: true});
  }

  #onSaveFile = () => {
    const tabInfo = this.#tabBar.getSelectedTabInfo();
    if (tabInfo.saved) {
      this.#storage.save(tabInfo);
    } else {
      this.#saveNewFile(tabInfo);
    }
  }

  #saveNewFile = (tabInfo) => {
    const newFileName = prompt('저장할 파일명을 입력해주세요.');
    if (this.#storage.isExistsFileName(newFileName)) {
      return alert('파일명이 중복되었습니다.');
    }
    this.#storage.saveAndUpdateFileNames({...tabInfo, newFileName});
    this.#explorer.loadFile(newFileName);
    this.#tabBar.updateTabName(newFileName);
  }
}

