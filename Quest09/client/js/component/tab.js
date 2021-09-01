class Tab {
  #fileName;
  #content;
  #saved;

  #tabDOM;
  #closeButton;
  #fileNameSpan;

  #parentDOM;

  get fileName() {
    return this.#fileName;
  }

  get content() {
    return this.#content;
  }

  get saved() {
    return this.#saved;
  }

  constructor(
    parentDOM,
    { fileName = "newfile", content = "", saved = false }
  ) {
    this.#parentDOM = parentDOM;
    this.#fileName = fileName;
    this.#content = content;
    this.#saved = saved;
    this.#tabDOM = this.#createTab();
    this.#tabDOM.onclick = this.#onClickTab;
    this.#closeButton.onclick = this.#onClickCloseButton;
  }

  #onClickTab = (e) => {
    this.#tabDOM.dispatchEvent(
      new CustomEvent("selectTab", {
        bubbles: true,
        detail: { fileName: this.#fileName, content: this.#content },
      })
    );
  };

  #onClickCloseButton = (e) => {
    e.stopPropagation();
    this.#tabDOM.dispatchEvent(
      new CustomEvent("removeTab", {
        bubbles: true,
        detail: { tab: this },
      })
    );
  };

  #createTab = () => {
    this.#closeButton = ElementCreator.create({
      tag: "button",
      textContent: "X",
    });
    this.#fileNameSpan = ElementCreator.create({
      tag: "span",
      textContent: this.#fileName,
    });
    return ElementCreator.create({
      classList: ["tab-component"],
      children: [this.#fileNameSpan, this.#closeButton],
      parent: this.#parentDOM,
    });
  };

  updateFileName = (fileName) => {
    this.#fileName = fileName;
    this.#fileNameSpan.textContent = fileName;
  };

  updateSaved = (saved) => {
    this.#saved = saved;
  };

  updateContent = (content) => {
    this.#content = content;
  };

  select = () => {
    this.#tabDOM.classList.add("tab-component-selected");
  };

  unselect = () => {
    this.#tabDOM.classList.remove("tab-component-selected");
  };

  setUnsaved = () => {
    this.#tabDOM.classList.add("tab-component-unsaved");
  };

  setSaved = () => {
    this.#tabDOM.classList.remove("tab-component-unsaved");
  };

  remove = () => {
    this.#parentDOM.removeChild(this.#tabDOM);
  };
}
