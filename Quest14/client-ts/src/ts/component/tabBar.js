class TabBar {
  constructor(parent) {
    this.tabMap = new Map();
    this.createSection = (parent) => ElementCreator.create({
      tag: 'section',
      classList: ['tab'],
      parent,
    });
    this.removeTab = (tab) => {
      if (this.selectedTab.fileName === tab.fileName) {
        this.selectedTab = null;
      }
      this.tabMap.delete(tab.fileName);
      tab.remove();
    };
    this.setSelectedTabSaved = () => {
      let _a;
      (_a = this.selectedTab) === null || _a === void 0 ? void 0 : _a.setSaved();
    };
    this.updateNewFileTabName = (newFileName) => {
      this.tabMap.delete('newfile');
      this.selectedTab.updateFileName(newFileName);
      this.selectedTab.updateSaved(true);
      this.tabMap.set(newFileName, this.selectedTab);
      this.setSelectedTabSaved();
    };
    this.isExistsTabByFileName = (fileName) => this.tabMap.has(fileName);
    this.changeSelectedTab = (fileName) => {
      let _a;
      (_a = this.selectedTab) === null || _a === void 0 ? void 0 : _a.unselect();
      this.selectedTab = this.tabMap.get(fileName);
      this.selectedTab.select();
    };
    this.openNewTab = ({ fileName = 'newfile', content = '', saved = false }) => {
      const newTab = this.createNewTab({ fileName, content, saved });
      this.tabMap.set(fileName, newTab);
      this.changeSelectedTab(fileName);
    };
    this.getSelectedTab = () => this.selectedTab;
    this.getTabByFileName = (fileName) => this.tabMap.get(fileName);
    this.updateSelectedTabContent = (content) => {
      this.selectedTab.updateContent(content);
      this.selectedTab.setUnsaved();
    };
    this.renameTab = ({ fileName, newFileName }) => {
      const tab = this.getTabByFileName(fileName);
      this.tabMap.delete(fileName);
      tab.updateFileName(newFileName);
      this.tabMap.set(newFileName, tab);
    };
    this.getOpenTabs = () => Array.from(this.tabMap.keys());
    this.createNewTab = ({ fileName, content, saved }) => new Tab(this.tabBarDOM, { fileName, content, saved });
    this.tabBarDOM = this.createSection(parent);
  }
}
// # sourceMappingURL=tabBar.js.map
