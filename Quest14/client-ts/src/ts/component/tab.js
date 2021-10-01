class Tab {
  constructor(parentDOM, { fileName = 'newfile', content = '', saved = false }) {
    this.onClickTab = (e) => {
      this.tabDOM.dispatchEvent(new CustomEvent('selectTab', {
        bubbles: true,
        detail: { fileName: this.fileName, content: this.content },
      }));
    };
    this.onClickCloseButton = (e) => {
      e.stopPropagation();
      this.tabDOM.dispatchEvent(new CustomEvent('removeTab', {
        bubbles: true,
        detail: { tab: this },
      }));
    };
    this.createTab = () => {
      this.closeButton = ElementCreator.create({
        tag: 'button',
        textContent: 'X',
      });
      this.fileNameSpan = ElementCreator.create({
        tag: 'span',
        textContent: this.fileName,
      });
      return ElementCreator.create({
        classList: ['tab-component'],
        children: [this.fileNameSpan, this.closeButton],
        parent: this.parentDOM,
      });
    };
    this.updateFileName = (fileName) => {
      this._fileName = fileName;
      this.fileNameSpan.textContent = fileName;
    };
    this.updateSaved = (saved) => {
      this._saved = saved;
    };
    this.updateContent = (content) => {
      this._content = content;
    };
    this.select = () => {
      this.tabDOM.classList.add('tab-component-selected');
    };
    this.unselect = () => {
      this.tabDOM.classList.remove('tab-component-selected');
    };
    this.setUnsaved = () => {
      this.tabDOM.classList.add('tab-component-unsaved');
    };
    this.setSaved = () => {
      this.tabDOM.classList.remove('tab-component-unsaved');
    };
    this.remove = () => {
      this.parentDOM.removeChild(this.tabDOM);
    };
    this.parentDOM = parentDOM;
    this._fileName = fileName;
    this._content = content;
    this._saved = saved;
    this.tabDOM = this.createTab();
    this.tabDOM.onclick = this.onClickTab;
    this.closeButton.onclick = this.onClickCloseButton;
  }

  get fileName() {
    return this._fileName;
  }

  get content() {
    return this._content;
  }

  get saved() {
    return this._saved;
  }
}
// # sourceMappingURL=tab.js.map
