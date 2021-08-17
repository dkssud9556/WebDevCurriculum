class Explorer {
  #explorerDOM;

  constructor(parent) {
    this.#explorerDOM = this.#createSection(parent);
  }

  #createSection = (parent) => {
    return ElementCreator.create({tag: 'section', classList: ['explorer'], parent});
  }

  loadFile = (fileName) => {
    const fileDiv = ElementCreator.create({textContent: fileName, classList: ['file']});
    fileDiv.onclick = (e) => this.#explorerDOM.dispatchEvent(new CustomEvent('clickFile', {
      bubbles: true, detail: {fileName}
    }));
    this.#explorerDOM.appendChild(fileDiv);
  }

  loadFiles = (fileNames) => {
    fileNames.forEach(fileName => this.loadFile(fileName));
  }
}