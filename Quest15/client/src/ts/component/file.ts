import ElementCreator from '../util/elementCreator';

export default class File {
  private fileDOM: HTMLElement;

  private fileNameSpan: HTMLElement;

  private deleteButton: HTMLElement;

  private renameButton: HTMLElement;

  private parentDOM: HTMLElement;

  private _fileName: string;

  get fileName() {
    return this._fileName;
  }

  constructor(parentDOM: HTMLElement, { fileName }: { fileName: string }) {
    this.parentDOM = parentDOM;
    this._fileName = fileName;
    this.createFile();
    this.fileDOM.onclick = this.onClickFile;
    this.deleteButton.onclick = this.onClickDeleteButton;
    this.renameButton.onclick = this.onClickRenameButton;
  }

  private createFile = () => {
    this.deleteButton = ElementCreator.create({
      tag: 'button',
      textContent: 'X',
      classList: ['file-delete-button'],
    });
    this.renameButton = ElementCreator.create({
      tag: 'button',
      textContent: '●',
      classList: ['file-rename-button'],
    });
    const buttonDiv = ElementCreator.create({
      classList: ['file-button-div'],
      children: [this.renameButton, this.deleteButton],
    });
    this.fileNameSpan = ElementCreator.create({
      tag: 'span',
      textContent: this.fileName,
    });
    this.fileDOM = ElementCreator.create({
      classList: ['file'],
      children: [this.fileNameSpan, buttonDiv],
    });
    this.parentDOM.appendChild(this.fileDOM);
  };

  onClickFile = (e: Event) => {
    this.fileDOM.dispatchEvent(
      new CustomEvent('clickFile', {
        bubbles: true,
        detail: { fileName: this.fileName },
      }),
    );
  };

  onClickDeleteButton = (e: Event) => {
    e.stopPropagation();
    this.fileDOM.dispatchEvent(
      new CustomEvent('deleteFile', {
        bubbles: true,
        detail: { file: this },
      }),
    );
  };

  onClickRenameButton = (e: Event) => {
    e.stopPropagation();
    this.fileDOM.dispatchEvent(
      new CustomEvent('renameFile', { bubbles: true, detail: { file: this } }),
    );
  };

  remove = () => {
    this.parentDOM.removeChild(this.fileDOM);
  };

  updateFileName = (newFileName: string) => {
    this.fileNameSpan.textContent = newFileName;
    this._fileName = newFileName;
  };
}
