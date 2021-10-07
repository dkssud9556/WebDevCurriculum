import Tab from './tab';
import ElementCreator from '../util/elementCreator';

export default class TabBar {
  private readonly tabBarDOM: HTMLElement;

  private tabMap = new Map<string, Tab>();

  private selectedTab: Tab | null;

  constructor(parent: HTMLElement) {
    this.tabBarDOM = this.createSection(parent);
  }

  private createSection = (parent: HTMLElement) => ElementCreator.create({
    tag: 'section',
    classList: ['tab'],
    parent,
  });

  removeTab = (tab: Tab) => {
    if (this.selectedTab?.fileName === tab.fileName) {
      this.selectedTab = null;
    }
    this.tabMap.delete(tab.fileName);
    tab.remove();
  };

  setSelectedTabSaved = () => {
    this.selectedTab?.setSaved();
  };

  updateNewFileTabName = (newFileName: string) => {
    if (this.selectedTab) {
      this.tabMap.delete('newfile');
      this.selectedTab.updateFileName(newFileName);
      this.selectedTab.updateSaved(true);
      this.tabMap.set(newFileName, this.selectedTab);
      this.setSelectedTabSaved();
    }
  };

  isExistsTabByFileName = (fileName: string) => this.tabMap.has(fileName);

  changeSelectedTab = (fileName: string) => {
    this.selectedTab?.unselect();
    this.selectedTab = this.tabMap.get(fileName) || null;
    this.selectedTab?.select();
  };

  openNewTab = ({ fileName = 'newfile', content = '', saved = false }) => {
    const newTab = this.createNewTab({ fileName, content, saved });
    this.tabMap.set(fileName, newTab);
    this.changeSelectedTab(fileName);
  };

  getSelectedTab = () => this.selectedTab;

  getTabByFileName = (fileName: string) => this.tabMap.get(fileName);

  updateSelectedTabContent = (content: string) => {
    if (this.selectedTab) {
      this.selectedTab.updateContent(content);
      this.selectedTab.setUnsaved();
    }
  };

  renameTab = ({
    fileName,
    newFileName,
  }: {
    fileName: string;
    newFileName: string;
  }) => {
    const tab = this.getTabByFileName(fileName);
    if (tab) {
      this.tabMap.delete(fileName);
      tab.updateFileName(newFileName);
      this.tabMap.set(newFileName, tab);
    }
  };

  getOpenTabs = () => Array.from(this.tabMap.keys());

  private createNewTab = ({
    fileName,
    content,
    saved,
  }: {
    fileName: string;
    content: string;
    saved: boolean;
  }) => new Tab(this.tabBarDOM, { fileName, content, saved });
}
