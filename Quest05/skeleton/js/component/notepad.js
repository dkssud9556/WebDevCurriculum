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
      this.#tabBar.openNewTab({saved: false});
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
    const tab = this.#tabBar.getTabByFileName(e.detail.fileName);
    if (tab) {
      this.#selectExistentTab(tab);
    } else {
      this.#openNewTab(e.detail.fileName);
    }
  }

  #selectExistentTab = (tab) => {
    this.#textArea.setValue(tab.content);
    this.#tabBar.changeSelectedTab(tab.element);
  }

  #openNewTab = (fileName) => {
    const content = this.#storage.getFileContentByName(fileName);
    this.#textArea.setValue(content);
    this.#tabBar.openNewTab({fileName, content, saved: true});
  }

  #onSaveFile = () => {
    const tab = this.#tabBar.getSelectedTab();
    if (tab.saved) {
      console.log(tab);
      this.#storage.save({
        fileName: tab.fileName,
        content: tab.content
      });
      this.#tabBar.setSelectedTabSaved();
    } else {
      this.#saveNewFile(tab);
    }
  }

  #saveNewFile = (tab) => {
    const newFileName = prompt('저장할 파일명을 입력해주세요.');
    if (this.#storage.isExistsFileName(newFileName)) {
      return alert('파일명이 중복되었습니다.');
    }
    this.#storage.saveAndUpdateFileNames({
      newFileName,
      content: tab.content
    });
    this.#explorer.loadFile(newFileName);
    this.#tabBar.updateTabName(newFileName);
  }
}

