import File from "../../src/ts/component/file";

describe('Test component unit test', () => {
    const fileName = 'file1';
    let file: File;
    let parentDOM: HTMLElement;

    beforeEach(() => {
        parentDOM = document.createElement('div');
        file = new File(parentDOM, { fileName });
    });

    test('updateFileName', () => {
        const newFileName = 'file2';
        file.updateFileName(newFileName);
        expect(file.fileName).toEqual(newFileName);
    });

    test('remove', () => {
        file.remove();
        expect(parentDOM.children).toHaveLength(0);
    });
});