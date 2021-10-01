class Explorer {
  #explorerDOM;

  #logoutButtonDOM;

  #fileListDOM;

  #files;

  constructor(parent) {
    this.#explorerDOM = this.#createSection(parent);
    this.#logoutButtonDOM.onclick = this.#onClickLogoutButton;
    this.#files = [];
  }

  #createSection = (parent) => {
    this.#fileListDOM = ElementCreator.create({
      classList: ['file-list'],
    });
    this.#logoutButtonDOM = ElementCreator.create({
      tag: 'button',
      classList: ['logout-button'],
      textContent: '로그아웃',
    });
    return ElementCreator.create({
      tag: 'section',
      classList: ['explorer'],
      parent,
      children: [this.#fileListDOM, this.#logoutButtonDOM],
    });
  };

  loadFile = (fileName) => {
    this.#files.push(new File(this.#fileListDOM, { fileName }));
  };

  loadFiles = (fileNames) => {
    fileNames.forEach((fileName) => this.loadFile(fileName));
  };

  #onClickLogoutButton = () => {
    this.#explorerDOM.dispatchEvent(
      new CustomEvent('logout', { bubbles: true }),
    );
  };
}
