class Tab {
  #fileName;
  #content;
  #saved;

  #tab;
  #closeButton;
  #fileNameSpan;

  get fileName() {
    return this.#fileName;
  }

  get content() {
    return this.#content;
  }

  get saved() {
    return this.#saved;
  }

  constructor(parent, {fileName = 'newfile', content = '', saved = false}) {
    this.#fileName = fileName;
    this.#content = content;
    this.#saved = saved;
    this.#tab = this.#createTab(parent);
    this.#tab.onclick = this.#onClickTab;
    this.#closeButton.onclick = this.#onClickCloseButton;
  }

  #onClickTab = (e) => {
    this.#tab.dispatchEvent(new CustomEvent('selectTab', {
      bubbles: true, detail: {fileName: this.#fileName, content: this.#content}
    }));
  }

  #onClickCloseButton = (e) => {
    e.stopPropagation();
    this.#tab.dispatchEvent(new CustomEvent('removeTab', {
      bubbles: true, detail: {tab: this.#tab, fileName: this.#fileName}
    }));
  }

  #createTab = (parent) => {
    this.#closeButton = ElementCreator.create({tag: 'button', textContent: 'X'});
    this.#fileNameSpan = ElementCreator.create({tag: 'span', textContent: this.#fileName});
    return ElementCreator.create({
      classList: ['tab-component'],
      children: [this.#fileNameSpan, this.#closeButton],
      parent
    });
  }

  updateFileName = (fileName) => {
    this.#fileName = fileName;
    this.#fileNameSpan.textContent = fileName;
  }

  updateSaved = (saved) => {
    this.#saved = saved;
  }

  updateContent = (content) => {
    this.#content = content;
  }

  select = () => {
    this.#tab.classList.add('tab-component-selected');
  }

  unselect = () => {
    this.#tab.classList.remove('tab-component-selected');
  }

  setUnsaved = () => {
    this.#tab.classList.add('tab-component-unsaved');
  }

  setSaved = () => {
    this.#tab.classList.remove('tab-component-unsaved');
  }
}