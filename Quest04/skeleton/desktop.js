class Desktop {
  #desktopElem;
  #icons;
  #folders;

  constructor(desktopElem, iconNum, folderNum) {
    this.#desktopElem = desktopElem;

    this.#icons = new Array(iconNum).fill(0).map(() => {
      const iconElem = document.createElement('div');
      this.#desktopElem.appendChild(iconElem);
      return new Icon(iconElem);
    });

    this.#folders = new Array(folderNum).fill(0).map(() => {
      const folderElem = document.createElement('div');
      this.#desktopElem.appendChild(folderElem);
      return new Folder(folderElem);
    });
  }
}

class Draggable {
  constructor(element) {
    element.onmousedown = e => {
      const {offsetX, offsetY} = e;

      this.#moveAt(element, e.pageX - offsetX, e.pageY - offsetY);

      element.parentElement.onmousemove = e => {
        this.#moveAt(element, e.pageX - offsetX, e.pageY - offsetY);
      }

      element.onmouseup = () => {
        element.parentElement.onmousemove = null;
        element.onmouseup = null;
      }
    }
  }

  #moveAt = (element, x, y) => {
    element.style.left = x + 'px';
    element.style.top = y + 'px';
  }
}

class DesktopElement extends Draggable {
  #element;

  constructor(element) {
    super(element);
    element.classList.add('desktop-element');
    this.#element = element;
    this.#setRandomPosition();
  }

  get element() {
    return this.#element;
  }

  #setRandomPosition = () => {
    const element = this.element;
    const parentElement = element.parentElement;
    if (parentElement === null) {
      throw new Error('should be appended before setting position');
    }
    element.style.left = (Math.random() * (parentElement.offsetWidth - element.offsetWidth)) + parentElement.offsetLeft + 'px';
    element.style.top = (Math.random() * (parentElement.offsetHeight - element.offsetHeight)) + parentElement.offsetTop + 'px';
  }
}

class Icon extends DesktopElement {
  constructor(element) {
    element.classList.add('icon');
    super(element);
  }
}

class Folder extends DesktopElement {
  constructor(element) {
    element.classList.add('folder');
    super(element);
    this.element.ondblclick = this.#onDoubleClick;
  }

  #onDoubleClick = e => {
    const windowElem = document.createElement('div');
    this.element.parentElement.appendChild(windowElem);
    const window = new Window(windowElem);
  }
}

class Window extends DesktopElement {
  constructor(element) {
    element.classList.add('window');
    super(element);
  }
}
