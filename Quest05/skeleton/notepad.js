class Notepad {
  #notepadElement;

  constructor() {
    this.#notepadElement = document.createElement('section');
    this.#notepadElement.classList.add('notepad');

    document.body.appendChild(this.#notepadElement);

    const explorerView = new ExplorerView();
    explorerView.appendTo(this.#notepadElement);

    const editorSection = document.createElement('section');
    editorSection.classList.add('editor');

    this.#notepadElement.appendChild(editorSection);

    const tabView = new TabView();
    tabView.appendTo(editorSection);

    const textAreaView = new TextAreaView();
    textAreaView.appendTo(editorSection);

    document.addEventListener('keydown', e => {
      if (e.key === 'n' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        console.log('새로운 파일');
      }
    })
  }
}

class TabView {
  #tabSection;

  constructor() {
    this.#tabSection = document.createElement('section');
    this.#tabSection.classList.add('tab');
  }

  appendTo(parent) {
    parent.appendChild(this.#tabSection);
  }
}

class ExplorerView {
  #explorerSection;

  constructor() {
    this.#explorerSection = document.createElement('section');
    this.#explorerSection.classList.add('explorer');
  }

  appendTo(parent) {
    parent.appendChild(this.#explorerSection);
  }
}

class TextAreaView {
  #textAreaSection;

  constructor() {
    this.#textAreaSection = document.createElement('section');
    this.#textAreaSection.classList.add('text-area');
    const textArea = document.createElement('textarea');
    textArea.classList.add('editor-text-area');
    this.#textAreaSection.appendChild(textArea);
  }

  appendTo(parent) {
    parent.appendChild(this.#textAreaSection);
  }
}

class Tab {

}

class Explorer {
  #fileNames;

  constructor(storage) {
    this.#fileNames = storage.getFileNames();
  }

  getFileNames() {
    return this.#fileNames;
  }
}

class Editor {

}

class File {
  constructor(name, content) {
    this.name = name;
    this.content = content;
  }
}

class LocalStorage {
  static #FILE_NAME_KEY = 'files';
  static #FILE_NAME_SEPARATOR = ':';

  getFileNames() {
    return localStorage.getItem(LocalStorage.#FILE_NAME_KEY).split(LocalStorage.#FILE_NAME_SEPARATOR);
  }

  getFileByName(name) {
    const content = localStorage.getItem(name);
    return new File(name, content);
  }
}