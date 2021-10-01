const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P((resolve) => { resolve(value); }); }
  return new (P || (P = Promise))((resolve, reject) => {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class Notepad {
  constructor(storage) {
    this.render = () => {
      this.notepadDOM = ElementCreator.create({
        tag: 'section',
        classList: ['notepad'],
      });
      this.explorer = new Explorer(this.notepadDOM);
      this.tabBar = new TabBar(this.notepadDOM);
      this.textArea = new TextArea(this.notepadDOM);
      document.body.appendChild(this.notepadDOM);
    };
    this.onNewFile = (e) => __awaiter(this, void 0, void 0, function* () {
      if (e.code === 'KeyN' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        if (this.tabBar.isExistsTabByFileName('newfile')) {
          return;
        }
        this.tabBar.openNewTab({ saved: false });
        this.textArea.setValue('');
      }
    });
    this.onSetTextAreaValue = (e) => {
      this.textArea.setValue(e.detail.content);
    };
    this.onContentModification = (e) => {
      this.tabBar.updateSelectedTabContent(e.detail.content);
    };
    this.onClickFile = (e) => __awaiter(this, void 0, void 0, function* () {
      const tab = this.tabBar.getTabByFileName(e.detail.fileName);
      if (tab) {
        yield this.selectTab(tab);
      } else {
        yield this.openNewTab(e.detail.fileName);
      }
    });
    this.selectTab = (tab) => __awaiter(this, void 0, void 0, function* () {
      this.textArea.setValue(tab.content);
      this.tabBar.changeSelectedTab(tab.fileName);
    });
    this.openNewTab = (fileName) => __awaiter(this, void 0, void 0, function* () {
      const content = yield this.storage.getFileContentByName(fileName);
      this.textArea.setValue(content);
      this.tabBar.openNewTab({ fileName, content, saved: true });
    });
    this.onSaveFile = (e) => __awaiter(this, void 0, void 0, function* () {
      const tab = this.tabBar.getSelectedTab();
      if (tab.saved) {
        yield this.storage.save({
          fileName: tab.fileName,
          content: tab.content,
        });
        this.tabBar.setSelectedTabSaved();
      } else {
        yield this.saveNewFile(tab);
      }
    });
    this.saveNewFile = (tab) => __awaiter(this, void 0, void 0, function* () {
      const newFileName = prompt('저장할 파일명을 입력해주세요.');
      if (yield this.storage.isExistsFileName(newFileName)) {
        return alert('파일명이 중복되었습니다.');
      }
      yield this.storage.saveNewFile({
        fileName: newFileName,
        content: tab.content,
      });
      this.explorer.loadFile(newFileName);
      this.tabBar.updateNewFileTabName(newFileName);
    });
    this.onSelectTab = (e) => __awaiter(this, void 0, void 0, function* () {
      this.tabBar.changeSelectedTab(e.detail.fileName);
      this.textArea.setValue(e.detail.content);
    });
    this.onDeleteFile = (e) => __awaiter(this, void 0, void 0, function* () {
      const { file } = e.detail;
      yield this.storage.deleteFile(file.fileName);
      file.remove();
      if (this.tabBar.isExistsTabByFileName(file.fileName)) {
        const tab = this.tabBar.getTabByFileName(file.fileName);
        tab.remove();
      }
    });
    this.onRenameFile = (e) => __awaiter(this, void 0, void 0, function* () {
      const { file } = e.detail;
      const { fileName } = file;
      const newFileName = prompt('새로운 파일명을 입력해주세요.');
      yield this.storage.updateFileName({
        fileName: file.fileName,
        newFileName,
      });
      file.updateFileName(newFileName);
      if (this.tabBar.isExistsTabByFileName(fileName)) {
        this.tabBar.renameTab({
          fileName,
          newFileName,
        });
      }
    });
    this.onRemoveTab = (e) => __awaiter(this, void 0, void 0, function* () {
      this.tabBar.removeTab(e.detail.tab);
    });
    this.onLogout = (e) => __awaiter(this, void 0, void 0, function* () {
      const selectedTab = this.tabBar.getSelectedTab();
      yield this.storage.updateTabStatus({
        openTabs: this.tabBar.getOpenTabs(),
        selectedTab: selectedTab ? selectedTab.fileName : null,
      });
      yield this.storage.logout();
      window.location.replace('/login');
    });
    this.storage = storage;
    this.render();
    this.notepadDOM.addEventListener('setTextAreaValue', this.onSetTextAreaValue);
    this.notepadDOM.addEventListener('contentModification', this.onContentModification);
    this.notepadDOM.addEventListener('clickFile', this.onClickFile);
    this.notepadDOM.addEventListener('saveFile', this.onSaveFile);
    this.notepadDOM.addEventListener('selectTab', this.onSelectTab);
    this.notepadDOM.addEventListener('deleteFile', this.onDeleteFile);
    this.notepadDOM.addEventListener('renameFile', this.onRenameFile);
    this.notepadDOM.addEventListener('removeTab', this.onRemoveTab);
    this.notepadDOM.addEventListener('logout', this.onLogout);
    document.addEventListener('keydown', this.onNewFile);
    storage
      .getFileNames()
      .then((fileNames) => this.explorer.loadFiles(fileNames))
      .then(() => storage.getTabs())
      .then((tabs) => __awaiter(this, void 0, void 0, function* () {
        let _a;
        const tabStatus = {
          selectedTab: (_a = tabs.find((tab) => tab.isSelected === true)) === null || _a === void 0 ? void 0 : _a.fileName,
          openTabs: tabs.map((tab) => tab.fileName),
        };
        yield Promise.all(tabStatus.openTabs.map((openTab) => {
          if (openTab === 'newfile') {
            return this.tabBar.openNewTab({ saved: false });
          }
          return this.openNewTab(openTab);
        }));
        if (tabStatus.selectedTab) {
          const tab = this.tabBar.getTabByFileName(tabStatus.selectedTab);
          yield this.selectTab(tab);
        }
      }))
      .catch((err) => {
        if (err.statusCode === 403) {
          alert('로그인이 필요합니다.');
          window.location.replace('/login');
        }
      });
  }
}
// # sourceMappingURL=notepad.js.map
