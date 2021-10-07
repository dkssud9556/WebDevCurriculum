import Explorer from './explorer';
import TabBar from './tabBar';
import TextArea from './textArea';
import Storage from '../storage';
import Tab from './tab';
import ElementCreator from '../util/elementCreator';

export default class Notepad {
  private notepadDOM: HTMLElement;

  private explorer: Explorer;

  private tabBar: TabBar;

  private textArea: TextArea;

  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
    this.render();
    this.notepadDOM.addEventListener(
      'setTextAreaValue',
      this.onSetTextAreaValue,
    );
    this.notepadDOM.addEventListener(
      'contentModification',
      this.onContentModification,
    );
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
      .then(async (tabs) => {
        const tabStatus = {
          selectedTab: tabs.find((tab) => tab.isSelected)?.fileName,
          openTabs: tabs.map((tab) => tab.fileName),
        };
        await Promise.all(
          tabStatus.openTabs.map((openTab) => {
            if (openTab === 'newfile') {
              return this.tabBar.openNewTab({ saved: false });
            }
            return this.openNewTab(openTab);
          }),
        );
        if (tabStatus.selectedTab) {
          const tab = this.tabBar.getTabByFileName(tabStatus.selectedTab);
          await this.selectTab(tab);
        }
      })
      .catch((err) => {
        if (err.statusCode === 403) {
          alert('로그인이 필요합니다.');
          window.location.replace('/login');
        }
      });
  }

  private render = () => {
    this.notepadDOM = ElementCreator.create({
      tag: 'section',
      classList: ['notepad'],
    });
    this.explorer = new Explorer(this.notepadDOM);
    this.tabBar = new TabBar(this.notepadDOM);
    this.textArea = new TextArea(this.notepadDOM);
    document.body.appendChild(this.notepadDOM);
  };

  private onNewFile = async (e) => {
    if (e.code === 'KeyN' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (this.tabBar.isExistsTabByFileName('newfile')) {
        return;
      }

      this.tabBar.openNewTab({ saved: false });
      this.textArea.setValue('');
    }
  };

  private onSetTextAreaValue = (e) => {
    this.textArea.setValue(e.detail.content);
  };

  private onContentModification = (e) => {
    this.tabBar.updateSelectedTabContent(e.detail.content);
  };

  private onClickFile = async (e) => {
    const tab = this.tabBar.getTabByFileName(e.detail.fileName);
    if (tab) {
      await this.selectTab(tab);
    } else {
      await this.openNewTab(e.detail.fileName);
    }
  };

  private selectTab = async (tab: Tab | undefined) => {
    if (tab) {
      this.textArea.setValue(tab.content);
      this.tabBar.changeSelectedTab(tab.fileName);
    }
  };

  private openNewTab = async (fileName: string) => {
    const content = await this.storage.getFileContentByName(fileName);
    this.textArea.setValue(content);
    this.tabBar.openNewTab({ fileName, content, saved: true });
  };

  private onSaveFile = async (e) => {
    const tab = this.tabBar.getSelectedTab();
    if (tab) {
      if (tab.saved) {
        await this.storage.save({
          fileName: tab.fileName,
          content: tab.content,
        });
        this.tabBar.setSelectedTabSaved();
      } else {
        await this.saveNewFile(tab);
      }
    }
  };

  private saveNewFile = async (tab: Tab) => {
    const newFileName = prompt('저장할 파일명을 입력해주세요.');
    if (!newFileName) {
      return alert('파일명을 제대로 입력해주세요.');
    }
    if (await this.storage.isExistsFileName(newFileName)) {
      return alert('파일명이 중복되었습니다.');
    }

    await this.storage.saveNewFile({
      fileName: newFileName,
      content: tab.content,
    });
    this.explorer.loadFile(newFileName);
    this.tabBar.updateNewFileTabName(newFileName);
  };

  private onSelectTab = async (e) => {
    this.tabBar.changeSelectedTab(e.detail.fileName);
    this.textArea.setValue(e.detail.content);
  };

  private onDeleteFile = async (e) => {
    const { file } = e.detail;
    await this.storage.deleteFile(file.fileName);
    file.remove();
    if (this.tabBar.isExistsTabByFileName(file.fileName)) {
      const tab = this.tabBar.getTabByFileName(file.fileName);
      tab?.remove();
    }
  };

  private onRenameFile = async (e) => {
    const { file } = e.detail;
    const { fileName } = file;
    const newFileName = prompt('새로운 파일명을 입력해주세요.');
    if (!newFileName) {
      return alert('새로운 파일명을 제대로 입력해주세요.');
    }
    await this.storage.updateFileName({
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
  };

  private onRemoveTab = async (e) => {
    this.tabBar.removeTab(e.detail.tab);
  };

  private onLogout = async (e) => {
    const selectedTab = this.tabBar.getSelectedTab();
    await this.storage.updateTabStatus({
      openTabs: this.tabBar.getOpenTabs(),
      selectedTab: selectedTab ? selectedTab.fileName : null,
    });
    await this.storage.logout();
    window.location.replace('/login');
  };
}
