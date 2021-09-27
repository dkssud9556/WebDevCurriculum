class File {
  #fileDOM;
  #fileNameSpan;
  #deleteButton;
  #renameButton;

  #parentDOM;

  #fileName;

  get fileName() {
    return this.#fileName;
  }

  constructor(parentDOM, { fileName }) {
    this.#parentDOM = parentDOM;
    this.#fileName = fileName;
    this.#createFile();
    this.#fileDOM.onclick = this.#onClickFile;
    this.#deleteButton.onclick = this.#onClickDeleteButton;
    this.#renameButton.onclick = this.#onClickRenameButton;
  }

  #createFile = () => {
    this.#deleteButton = ElementCreator.create({
      tag: "button",
      textContent: "X",
      classList: ["file-delete-button"],
    });
    this.#renameButton = ElementCreator.create({
      tag: "button",
      textContent: "●",
      classList: ["file-rename-button"],
    });
    const buttonDiv = ElementCreator.create({
      classList: ["file-button-div"],
      children: [this.#renameButton, this.#deleteButton],
    });
    this.#fileNameSpan = ElementCreator.create({
      tab: "span",
      textContent: this.#fileName,
    });
    this.#fileDOM = ElementCreator.create({
      classList: ["file"],
      children: [this.#fileNameSpan, buttonDiv],
    });
    this.#parentDOM.appendChild(this.#fileDOM);
  };

  #onClickFile = (e) => {
    this.#fileDOM.dispatchEvent(
      new CustomEvent("clickFile", {
        bubbles: true,
        detail: { fileName: this.#fileName },
      })
    );
  };

  #onClickDeleteButton = (e) => {
    e.stopPropagation();
    this.#fileDOM.dispatchEvent(
      new CustomEvent("deleteFile", {
        bubbles: true,
        detail: { file: this },
      })
    );
  };

  #onClickRenameButton = (e) => {
    e.stopPropagation();
    this.#fileDOM.dispatchEvent(
      new CustomEvent("renameFile", { bubbles: true, detail: { file: this } })
    );
  };

  remove = () => {
    this.#parentDOM.removeChild(this.#fileDOM);
  };

  updateFileName = (newFileName) => {
    this.#fileNameSpan.textContent = newFileName;
    this.#fileName = newFileName;
  };
}
