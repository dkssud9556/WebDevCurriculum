class TextArea {
  constructor(parent) {
    this.createTextArea = (parent) => ElementCreator.createTextArea({
      classList: ['text-area'],
      parent,
    });
    this.setValue = (content) => {
      this.textAreaDOM.value = content;
    };
    this.setSelectedTabUnsaved = (e) => {
      this.textAreaDOM.dispatchEvent(new CustomEvent('contentModification', {
        bubbles: true,
        detail: { content: this.textAreaDOM.value },
      }));
    };
    this.onKeydown = (e) => {
      if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.textAreaDOM.dispatchEvent(new CustomEvent('saveFile', {
          bubbles: true,
        }));
      }
    };
    this.textAreaDOM = this.createTextArea(parent);
    this.textAreaDOM.oninput = this.setSelectedTabUnsaved;
    this.textAreaDOM.onkeydown = this.onKeydown;
  }
}
// # sourceMappingURL=textArea.js.map
