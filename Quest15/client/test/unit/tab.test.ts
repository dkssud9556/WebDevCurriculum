import Tab from "../../src/ts/component/tab";

describe('Tab component unit test', () => {
    let tab: Tab;
    let parentDOM: HTMLElement;

    beforeEach(() => {
        parentDOM = document.createElement('div');
        tab = new Tab(parentDOM, {});
    });

    test('remove', () => {
        tab.remove();
        expect(parentDOM.children).toHaveLength(0);
    });

    test('updateContent', () => {
        const newContent = 'new content';
        tab.updateContent(newContent);
        expect(tab.content).toEqual(newContent);
    });

    test('updateSaved', () => {
        tab.updateSaved(true);
        expect(tab.saved).toEqual(true);
    });

    test('setSaved', () => {
        tab.setSaved();
        expect(tab.saved).toEqual(false);
    });

    test('setUnsaved', () => {
        tab.setUnsaved();
        expect(tab.saved).toEqual(false);
    });

    test('updateFileName', () => {
        const newFileName = 'file1';
        tab.updateFileName(newFileName);
        expect(tab.fileName).toEqual(newFileName);
    });
});