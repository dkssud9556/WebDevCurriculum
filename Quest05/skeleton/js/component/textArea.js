class TextArea {
  #textArea;

  constructor(parent) {
    this.#textArea = this.#createTextArea(parent);
    this.#textArea.oninput = this.#setSelectedTabUnsaved;
    this.#textArea.onkeydown = this.#onKeydown;
  }

  #createTextArea = (parent) => {
    return ElementCreator.create({tag: 'textarea', classList: ['text-area'], parent});
  }

  setValue = (content) => {
    this.#textArea.value = content;
  }

  #setSelectedTabUnsaved = (e) => {
    this.#textArea.dispatchEvent(new CustomEvent('contentModification', {
      bubbles: true, detail: {content: this.#textArea.value}
    }));
  }

  #onKeydown = (e) => {
    if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      this.#textArea.dispatchEvent(new CustomEvent('saveFile', {
        bubbles: true
      }));
    }
  }
}