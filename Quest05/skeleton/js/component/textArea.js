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
    EventManager.emit(e, 'contentModification', {content: this.#textArea.value});
  }

  #onKeydown = (e) => {
    if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      EventManager.emit(e, 'saveFile');
    }
  }
}