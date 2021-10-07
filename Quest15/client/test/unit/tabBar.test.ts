import TabBar from "../../src/ts/component/tabBar";
import Tab from "../../src/ts/component/tab";

describe('TabBar component unit test', () => {
    const tabs = [
        { fileName: 'file1', content: 'content', saved: true },
        { fileName: 'file2', content: 'content', saved: true },
        { fileName: 'file3', content: 'content', saved: false },
        { fileName: 'file4', content: 'content', saved: false },
        { fileName: 'file5', content: 'content', saved: false },
    ]
    let tabBar: TabBar;
    let parentDOM: HTMLElement;

    beforeEach(() => {
        parentDOM = document.createElement('div');
        tabBar = new TabBar(parentDOM);
        tabs.forEach(tab => tabBar.openNewTab(tab));
    });

    test('changeSelectedTab', () => {
        tabBar.changeSelectedTab(tabs[0].fileName);

        const selectedTab = tabBar.getSelectedTab();
        expect(selectedTab?.fileName).toEqual(tabs[0].fileName);
        expect(selectedTab?.content).toEqual(tabs[0].content);
        expect(selectedTab?.saved).toEqual(tabs[0].saved);
    });

    test('isExistsTabByFileName', () => {
        const fileName = 'nonexistent';
        const isExists = tabBar.isExistsTabByFileName(fileName);
        expect(isExists).toEqual(false);
    });

    test('getOpenTabs', () => {
        const openTabs = tabBar.getOpenTabs();
        expect(openTabs).toEqual(tabs.map(tab => tab.fileName));
    });

    test('renameTab', () => {
        const tabInfo = { fileName: tabs[0].fileName, newFileName: 'newFileName' };
        tabBar.renameTab(tabInfo);
        expect(tabBar.getOpenTabs().includes(tabInfo.fileName)).toEqual(false);
        expect(tabBar.getOpenTabs().includes(tabInfo.newFileName)).toEqual(true);
    });

    test('removeTab', () => {
        const fileName = tabs[0].fileName;
        const tab = tabBar.getTabByFileName(fileName);
        tabBar.removeTab(tab as Tab);
        expect(tabBar.getOpenTabs().includes(fileName)).toEqual(false);
    });

    test('updateSelectedTabContent', () => {
        const fileName = tabs[0].fileName;
        const content = 'new content';
        tabBar.changeSelectedTab(fileName);
        tabBar.updateSelectedTabContent(content);
        expect(tabBar.getSelectedTab()?.content).toEqual(content);
    });

    test('updateNewFileTabName', () => {
        const newTabName = 'file5';
        tabBar.openNewTab({});
        tabBar.updateNewFileTabName(newTabName);
        expect(tabBar.getOpenTabs().includes(newTabName)).toEqual(true);
    })
});