class Notepad {
  #notepadDOM;

  #explorer;

  #tabBar;

  #textArea;

  #storage;

  constructor(storage) {
    this.#storage = storage;
    this.#render();
    this.#notepadDOM.addEventListener(
      'setTextAreaValue',
      this.#onSetTextAreaValue,
    );
    this.#notepadDOM.addEventListener(
      'contentModification',
      this.#onContentModification,
    );
    this.#notepadDOM.addEventListener('clickFile', this.#onClickFile);
    this.#notepadDOM.addEventListener('saveFile', this.#onSaveFile);
    this.#notepadDOM.addEventListener('selectTab', this.#onSelectTab);
    this.#notepadDOM.addEventListener('deleteFile', this.#onDeleteFile);
    this.#notepadDOM.addEventListener('renameFile', this.#onRenameFile);
    this.#notepadDOM.addEventListener('removeTab', this.#onRemoveTab);
    this.#notepadDOM.addEventListener('logout', this.#onLogout);
    document.addEventListener('keydown', this.#onNewFile);
    storage
      .getFileNames()
      .then((fileNames) => this.#explorer.loadFiles(fileNames))
      .then(() => storage.getTabs())
      .then(async (tabs) => {
        const tabStatus = {
          selectedTab: tabs.find((tab) => tab.isSelected === true)?.fileName,
          openTabs: tabs.map((tab) => tab.fileName),
        };
        await Promise.all(
          tabStatus.openTabs.map((openTab) => {
            if (openTab === 'newfile') {
              return this.#tabBar.openNewTab({ saved: false });
            }
            return this.#openNewTab(openTab);
          }),
        );
        if (tabStatus.selectedTab) {
          const tab = this.#tabBar.getTabByFileName(tabStatus.selectedTab);
          await this.#selectTab(tab);
        }
      })
      .catch((err) => {
        if (err.statusCode === 403) {
          alert('로그인이 필요합니다.');
          window.location.replace('/login');
        }
      });
  }

  #render = () => {
    this.#notepadDOM = ElementCreator.create({
      tag: 'section',
      classList: ['notepad'],
    });
    this.#explorer = new Explorer(this.#notepadDOM);
    this.#tabBar = new TabBar(this.#notepadDOM);
    this.#textArea = new TextArea(this.#notepadDOM);
    document.body.appendChild(this.#notepadDOM);
  };

  #onNewFile = async (e) => {
    if (e.code === 'KeyN' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (this.#tabBar.isExistsTabByFileName('newfile')) {
        return;
      }

      this.#tabBar.openNewTab({ saved: false });
      this.#textArea.setValue('');
    }
  };

  #onSetTextAreaValue = (e) => {
    this.#textArea.setValue(e.detail.content);
  };

  #onContentModification = (e) => {
    this.#tabBar.updateSelectedTabContent(e.detail.content);
  };

  #onClickFile = async (e) => {
    const tab = this.#tabBar.getTabByFileName(e.detail.fileName);
    if (tab) {
      await this.#selectTab(tab);
    } else {
      await this.#openNewTab(e.detail.fileName);
    }
  };

  #selectTab = async (tab) => {
    this.#textArea.setValue(tab.content);
    this.#tabBar.changeSelectedTab(tab.fileName);
  };

  #openNewTab = async (fileName) => {
    const content = await this.#storage.getFileContentByName(fileName);
    this.#textArea.setValue(content);
    this.#tabBar.openNewTab({ fileName, content, saved: true });
  };

  #onSaveFile = async () => {
    const tab = this.#tabBar.getSelectedTab();
    if (tab.saved) {
      await this.#storage.save({
        fileName: tab.fileName,
        content: tab.content,
      });
      this.#tabBar.setSelectedTabSaved();
    } else {
      await this.#saveNewFile(tab);
    }
  };

  #saveNewFile = async (tab) => {
    const newFileName = prompt('저장할 파일명을 입력해주세요.');
    if (await this.#storage.isExistsFileName(newFileName)) {
      alert('파일명이 중복되었습니다.');
    } else {
      await this.#storage.saveNewFile({
        fileName: newFileName,
        content: tab.content,
      });
      this.#explorer.loadFile(newFileName);
      this.#tabBar.updateNewFileTabName(newFileName);
    }
  }

  #onSelectTab = async (e) => {
    this.#tabBar.changeSelectedTab(e.detail.fileName);
    this.#textArea.setValue(e.detail.content);
  };

  #onDeleteFile = async (e) => {
    const { file } = e.detail;
    await this.#storage.deleteFile(file.fileName);
    file.remove();
    if (this.#tabBar.isExistsTabByFileName(file.fileName)) {
      const tab = this.#tabBar.getTabByFileName(file.fileName);
      tab.remove();
    }
  };

  #onRenameFile = async (e) => {
    const { file } = e.detail;
    const { fileName } = file;
    const newFileName = prompt('새로운 파일명을 입력해주세요.');
    await this.#storage.updateFileName({
      fileName: file.fileName,
      newFileName,
    });
    file.updateFileName(newFileName);
    if (this.#tabBar.isExistsTabByFileName(fileName)) {
      this.#tabBar.renameTab({
        fileName,
        newFileName,
      });
    }
  };

  #onRemoveTab = async (e) => {
    this.#tabBar.removeTab(e.detail.tab);
  };

  #onLogout = async () => {
    const selectedTab = this.#tabBar.getSelectedTab();
    await this.#storage.updateTabStatus({
      openTabs: this.#tabBar.getOpenTabs(),
      selectedTab: selectedTab ? selectedTab.fileName : null,
    });
    await this.#storage.logout();
    window.location.replace('/login');
  };
}
