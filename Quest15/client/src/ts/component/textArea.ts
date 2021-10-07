import ElementCreator from '../util/elementCreator';

export default class TextArea {
  private textAreaDOM: HTMLTextAreaElement;

  constructor(parent: HTMLElement) {
    this.textAreaDOM = this.createTextArea(parent);
    this.textAreaDOM.oninput = this.setSelectedTabUnsaved;
    this.textAreaDOM.onkeydown = this.onKeydown;
  }

  private createTextArea = (parent: HTMLElement) => ElementCreator.createTextArea({
    classList: ['text-area'],
    parent,
  });

  setValue = (content: string) => {
    this.textAreaDOM.value = content;
  };

  private setSelectedTabUnsaved = (e: Event) => {
    this.textAreaDOM.dispatchEvent(
      new CustomEvent('contentModification', {
        bubbles: true,
        detail: { content: this.textAreaDOM.value },
      }),
    );
  };

  private onKeydown = (e) => {
    if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      this.textAreaDOM.dispatchEvent(
        new CustomEvent('saveFile', {
          bubbles: true,
        }),
      );
    }
  };
}
