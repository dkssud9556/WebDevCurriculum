class Desktop {
  #desktopElement;
  #desktopComponents = [];

  constructor(desktopElement, {iconNum, folderNum}) {
    this.#desktopElement = desktopElement;
    this.#addDesktopComponents(iconNum, (iconElement) => new Icon(iconElement));
    this.#addDesktopComponents(folderNum, (folderElement) => new Folder(folderElement));
    this.#setUpComponents();
  }

  #addDesktopComponents = (count, makeDesktopComponent) => {
    this.#desktopComponents = this.#desktopComponents.concat(
      this.#makeDesktopComponents(count, makeDesktopComponent)
    );
  }

  #makeDesktopComponents = (count, makeDesktopComponent) => {
    return new Array(count).fill(0)
      .map(() => makeDesktopComponent(document.createElement('div')));
  }

  #setUpComponents = () => {
    this.#desktopComponents.forEach(desktopComponent =>
      desktopComponent.setUpTo(this.#desktopElement));
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

class DesktopComponent extends Draggable {
  #element;

  constructor(element) {
    super(element);
    this.#element = element;
    element.classList.add('desktop-element');
  }

  get element() {
    return this.#element;
  }

  get parentElement() {
    return this.#element.parentElement;
  }

  setUpTo = (parentElement) => {
    this.#appendTo(parentElement);
    this.#setRandomPosition();
  }

  #setRandomPosition = () => {
    if (this.parentElement === null) {
      throw new Error('should be appended before setting position');
    }
    this.element.style.left = (Math.random() * (this.parentElement.offsetWidth - this.element.offsetWidth)) + this.parentElement.offsetLeft + 'px';
    this.element.style.top = (Math.random() * (this.parentElement.offsetHeight - this.element.offsetHeight)) + this.parentElement.offsetTop + 'px';
  }

  #appendTo = (parentElement) => {
    parentElement.appendChild(this.#element);
  }
}

class Icon extends DesktopComponent {
  constructor(element) {
    element.classList.add('icon');
    super(element);
  }
}

class Folder extends DesktopComponent {
  #window;

  constructor(element) {
    element.classList.add('folder');
    super(element);
    this.element.ondblclick = this.#onDoubleClick;
  }

  #onDoubleClick = e => {
    if (this.#window) {
      this.#closeFolder();
    } else {
      this.#openFolder();
    }
  }

  #openFolder = () => {
    const windowElement = document.createElement('div');
    this.#window = new Window(windowElement);
    this.#window.setUpTo(this.parentElement);
  }

  #closeFolder = () => {
    this.#window.parentElement.removeChild(this.#window.element);
    this.#window = null;
  }
}

class Window extends DesktopComponent {
  constructor(element) {
    element.classList.add('window');
    super(element);
  }
}
