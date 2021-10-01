import ElementCreator from '../util/elementCreator';

export default class Tab {
  private _fileName: string;

  private _content: string;

  private _saved: boolean;

  private readonly tabDOM: HTMLElement;

  private closeButton: HTMLElement;

  private fileNameSpan: HTMLElement;

  private readonly parentDOM: HTMLElement;

  get fileName() {
    return this._fileName;
  }

  get content() {
    return this._content;
  }

  get saved() {
    return this._saved;
  }

  constructor(
    parentDOM: HTMLElement,
    {
      fileName = 'newfile',
      content = '',
      saved = false,
    }: {
      fileName?: string;
      content?: string;
      saved?: boolean;
    },
  ) {
    this.parentDOM = parentDOM;
    this._fileName = fileName;
    this._content = content;
    this._saved = saved;
    this.tabDOM = this.createTab();
    this.tabDOM.onclick = this.onClickTab;
    this.closeButton.onclick = this.onClickCloseButton;
  }

  private onClickTab = (e: Event) => {
    this.tabDOM.dispatchEvent(
      new CustomEvent('selectTab', {
        bubbles: true,
        detail: { fileName: this.fileName, content: this.content },
      }),
    );
  };

  private onClickCloseButton = (e: Event) => {
    e.stopPropagation();
    this.tabDOM.dispatchEvent(
      new CustomEvent('removeTab', {
        bubbles: true,
        detail: { tab: this },
      }),
    );
  };

  createTab = () => {
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

  updateFileName = (fileName: string) => {
    this._fileName = fileName;
    this.fileNameSpan.textContent = fileName;
  };

  updateSaved = (saved: boolean) => {
    this._saved = saved;
  };

  updateContent = (content: string) => {
    this._content = content;
  };

  select = () => {
    this.tabDOM.classList.add('tab-component-selected');
  };

  unselect = () => {
    this.tabDOM.classList.remove('tab-component-selected');
  };

  setUnsaved = () => {
    this.tabDOM.classList.add('tab-component-unsaved');
  };

  setSaved = () => {
    this.tabDOM.classList.remove('tab-component-unsaved');
  };

  remove = () => {
    this.parentDOM.removeChild(this.tabDOM);
  };
}
