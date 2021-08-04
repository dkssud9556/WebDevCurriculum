class Desktop {
  constructor(desktopElem, iconNum, folderNum) {
    this.element = desktopElem;
    this.icons = new Array(iconNum).fill(0).map(() => {
      const iconElem = document.createElement('div');
      iconElem.classList.add('icon');
      return new Icon(iconElem);
    });
    this.folders = new Array(folderNum).fill(0).map(() => {
      const folderElem = document.createElement('div');
      folderElem.classList.add('folder');
      return new Folder(folderElem, this.element);
    });
  }

  showIcons() {
    this.icons.forEach(icon => this.element.appendChild(icon.element));
  }

  showFolders() {
    this.folders.forEach(folder => this.element.appendChild(folder.element));
  }
}

class Draggable {
  #element;

  constructor(element) {
    this.#element = element;
    this.#element.onmousedown = e => {
      const { offsetX, offsetY } = e;
      this.#element.style.position = 'absolute';
      this.#element.style.zIndex = 1000;

      document.onmousemove = e => {
        this.#moveAt(e.pageX, e.pageY, offsetX, offsetY);
      }

      this.#element.onmouseup = () => {
        document.onmousemove = null;
        this.#element.onmouseup = null;
      }
    }
  }

  get element() {
    return this.#element;
  }

  #moveAt(pageX, pageY, offsetX, offsetY) {
    this.#element.style.left = pageX - offsetX + 'px';
    this.#element.style.top = pageY - offsetY + 'px';
  }
}

class Icon extends Draggable {
  constructor(element) {
    super(element);
  }
}

class Folder extends Draggable {
  #parentElem;

  constructor(element, parentElem) {
    super(element);
    this.#parentElem = parentElem;
    this.#onDoubleClick();
  }

  #onDoubleClick() {
    this.element.ondblclick = e => {
      const windowElem = document.createElement('div');
      windowElem.classList.add('window');
      const window = new Window(windowElem);
      this.#parentElem.appendChild(window.element);
    }
  }
}

class Window extends Draggable {
  constructor(element) {
    super(element);
  }
}
