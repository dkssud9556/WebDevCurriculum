class File {
  constructor(parentDOM, { fileName }) {
    this.createFile = () => {
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
    this.onClickFile = (e) => {
      this.fileDOM.dispatchEvent(new CustomEvent('clickFile', {
        bubbles: true,
        detail: { fileName: this.fileName },
      }));
    };
    this.onClickDeleteButton = (e) => {
      e.stopPropagation();
      this.fileDOM.dispatchEvent(new CustomEvent('deleteFile', {
        bubbles: true,
        detail: { file: this },
      }));
    };
    this.onClickRenameButton = (e) => {
      e.stopPropagation();
      this.fileDOM.dispatchEvent(new CustomEvent('renameFile', { bubbles: true, detail: { file: this } }));
    };
    this.remove = () => {
      this.parentDOM.removeChild(this.fileDOM);
    };
    this.updateFileName = (newFileName) => {
      this.fileNameSpan.textContent = newFileName;
      this._fileName = newFileName;
    };
    this.parentDOM = parentDOM;
    this._fileName = fileName;
    this.createFile();
    this.fileDOM.onclick = this.onClickFile;
    this.deleteButton.onclick = this.onClickDeleteButton;
    this.renameButton.onclick = this.onClickRenameButton;
  }

  get fileName() {
    return this._fileName;
  }
}
// # sourceMappingURL=file.js.map
