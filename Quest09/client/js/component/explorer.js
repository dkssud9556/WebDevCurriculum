class Explorer {
  #explorerDOM;

  constructor(parent) {
    this.#explorerDOM = this.#createSection(parent);
  }

  #createSection = (parent) => {
    return ElementCreator.create({
      tag: "section",
      classList: ["explorer"],
      parent,
    });
  };

  loadFile = (fileName) => {
    new File(this.#explorerDOM, { fileName });
  };

  loadFiles = (fileNames) => {
    fileNames.forEach((fileName) => this.loadFile(fileName));
  };
}
