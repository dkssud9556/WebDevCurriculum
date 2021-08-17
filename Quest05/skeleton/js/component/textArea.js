class TextArea {
  #textAreaDOM;

  constructor(parent) {
    this.#textArea = this.#createTextArea(parent);
    this.#textAreaDOM.oninput = this.#setSelectedTabUnsaved;
    this.#textAreaDOM.onkeydown = this.#onKeydown;
  }

  #createTextArea = (parent) => {
    return ElementCreator.create({tag: 'textarea', classList: ['text-area'], parent});
  }

  setValue = (content) => {
    this.#textAreaDOM.value = content;
  }

  #setSelectedTabUnsaved = (e) => {
    this.#textAreaDOM.dispatchEvent(new CustomEvent('contentModification', {
      bubbles: true, detail: {content: this.#textAreaDOM.value}
    }));
  }

  #onKeydown = (e) => {
    if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      this.#textAreaDOM.dispatchEvent(new CustomEvent('saveFile', {
        bubbles: true
      }));
    }
  }
}