class Notepad {
  #notepadDOM;
  #explorer;
  #tabBar;
  #textArea;
  #storage;

  constructor(storage) {
    this.#storage = storage;
    this.#render();
    this.#notepadDOM.addEventListener('setTextAreaValue', this.#onSetTextAreaValue);
    this.#notepadDOM.addEventListener('contentModification', this.#onContentModification);
    this.#notepadDOM.addEventListener('clickFile', this.#onClickFile);
    this.#notepadDOM.addEventListener('saveFile', this.#onSaveFile);
    this.#notepadDOM.addEventListener('selectTab', this.#onSelectTab);
    document.addEventListener('keydown', this.#onNewFile);
    this.#explorer.loadFiles(storage.getFileNames());
  }

  #render = () => {
    this.#notepadDOM = ElementCreator.create({
      tag: 'section',
      classList: ['notepad']
    });
    this.#explorer = new Explorer(this.#notepadDOM);
    this.#tabBar = new TabBar(this.#notepadDOM);
    this.#textArea = new TextArea(this.#notepadDOM);
    document.body.appendChild(this.#notepadDOM);
  }

  #onNewFile = (e) => {
    if (e.key === 'n' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (this.#tabBar.isExistsTabByFileName('newfile')) {
        return;
      }

      this.#tabBar.openNewTab({saved: false});
      this.#textArea.setValue('');
    }
  }

  #onSetTextAreaValue = (e) => {
    this.#textArea.setValue(e.detail.content);
  }

  #onContentModification = (e) => {
    this.#tabBar.updateSelectedTabContent(e.detail.content);
  }

  #onClickFile = (e) => {
    const tab = this.#tabBar.getTabByFileName(e.detail.fileName);
    if (tab) {
      this.#selectExistentTab(tab);
    } else {
      this.#openNewTab(e.detail.fileName);
    }
  }

  #selectExistentTab = (tab) => {
    this.#textArea.setValue(tab.content);
    this.#tabBar.changeSelectedTab(tab.fileName);
  }

  #openNewTab = (fileName) => {
    const content = this.#storage.getFileContentByName(fileName);
    this.#textArea.setValue(content);
    this.#tabBar.openNewTab({fileName, content, saved: true});
  }

  #onSaveFile = (e) => {
    const tab = this.#tabBar.getSelectedTab();
    if (tab.saved) {
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
      fileName: newFileName,
      content: tab.content
    });
    this.#explorer.loadFile(newFileName);
    this.#tabBar.updateTabName(newFileName);
  }

  #onSelectTab = (e) => {
    this.#tabBar.changeSelectedTab(e.detail.fileName);
    this.#textArea.setValue(e.detail.content);
  }
}

