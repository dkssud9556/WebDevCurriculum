import ElementCreator from '../util/elementCreator';
import File from "./file";

export default class Explorer {
  private explorerDOM: HTMLElement;

  private logoutButtonDOM: HTMLElement;

  private fileListDOM: HTMLElement;

  constructor(parent: HTMLElement) {
    this.explorerDOM = this.createSection(parent);
    this.logoutButtonDOM.onclick = this.onClickLogoutButton;
  }

  private createSection = (parent: HTMLElement) => {
    this.fileListDOM = ElementCreator.create({
      classList: ['file-list'],
    });
    this.logoutButtonDOM = ElementCreator.create({
      tag: 'button',
      classList: ['logout-button'],
      textContent: '로그아웃',
    });
    return ElementCreator.create({
      tag: 'section',
      classList: ['explorer'],
      parent,
      children: [this.fileListDOM, this.logoutButtonDOM],
    });
  };

  loadFile = (fileName: string) => {
    new File(this.fileListDOM, { fileName });
  };

  loadFiles = (fileNames: string[]) => {
    fileNames.forEach((fileName) => this.loadFile(fileName));
  };

  private onClickLogoutButton = (e: Event) => {
    this.explorerDOM.dispatchEvent(
      new CustomEvent('logout', { bubbles: true }),
    );
  };
}
