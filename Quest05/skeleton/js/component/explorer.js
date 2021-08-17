class Explorer {
  #explorerSection;

  constructor(parent) {
    this.#explorerSection = this.#createSection(parent);
  }

  #createSection = (parent) => {
    return ElementCreator.create({tag: 'section', classList: ['explorer'], parent});
  }

  loadFile = (fileName) => {
    const fileDiv = ElementCreator.create({textContent: fileName, classList: ['file']});
    fileDiv.onclick = (e) => this.#explorerSection.dispatchEvent(new CustomEvent('clickFile', {
      bubbles: true, detail: {fileName}
    }));
    this.#explorerSection.appendChild(fileDiv);
  }

  loadFiles = (fileNames) => {
    fileNames.forEach(fileName => this.loadFile(fileName));
  }
}