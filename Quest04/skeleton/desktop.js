class Desktop {
  #desktop;
  #desktopElements = [];

  constructor(desktopElem, {iconNum, folderNum}) {
    this.#desktop = desktopElem;
    this.#addDesktopElements(iconNum, (iconElement) => new Icon(iconElement));
    this.#addDesktopElements(folderNum, (folderElement) => new Folder(folderElement));
  }

  #addDesktopElements = (count, makeDesktopElement) => {
    this.#desktopElements = this.#desktopElements.concat(
      new Array(count).fill(0).map(() => {
        const newElement = document.createElement('div');
        this.#desktop.appendChild(newElement);
        return makeDesktopElement(newElement);
      })
    );
  }
}

class Draggable {
  constructor(element) {
    element.onmousedown = e => {
      const {offsetX, offsetY} = e;

      this.#moveAt({
        element,
        xPosition: e.pageX - offsetX,
        yPosition: e.pageY - offsetY
      });

      element.parentElement.onmousemove = e => {
        this.#moveAt({
          element,
          xPosition: e.pageX - offsetX,
          yPosition: e.pageY - offsetY
        });
      }

      element.onmouseup = () => {
        element.parentElement.onmousemove = null;
        element.onmouseup = null;
      }
    }
  }

  #moveAt = ({element, xPosition, yPosition}) => {
    element.style.left = xPosition + 'px';
    element.style.top = yPosition + 'px';
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
  #window;

  constructor(element) {
    element.classList.add('folder');
    super(element);
    this.element.ondblclick = this.#onDoubleClick;
  }

  #onDoubleClick = e => {
    if (this.#window) {
      this.#window.element.parentElement.removeChild(this.#window.element);
      this.#window = null;
    } else {
      const windowElem = document.createElement('div');
      this.element.parentElement.appendChild(windowElem);
      this.#window = new Window(windowElem);
    }
  }
}

class Window extends DesktopElement {
  constructor(element) {
    element.classList.add('window');
    super(element);
  }
}
