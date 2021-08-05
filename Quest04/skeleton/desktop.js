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
    this.#desktopComponents.forEach(desktopComponent => {
      desktopComponent.addTo(this.#desktopElement);
      desktopComponent.setRandomPosition();
    });
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
    element.classList.add('desktop-element');
    this.#element = element;
  }

  get element() {
    return this.#element;
  }

  setRandomPosition = () => {
    const element = this.element;
    const parentElement = element.parentElement;
    if (parentElement === null) {
      throw new Error('should be appended before setting position');
    }
    element.style.left = (Math.random() * (parentElement.offsetWidth - element.offsetWidth)) + parentElement.offsetLeft + 'px';
    element.style.top = (Math.random() * (parentElement.offsetHeight - element.offsetHeight)) + parentElement.offsetTop + 'px';
  }

  addTo = (parentElement) => {
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
      this.#window.element.parentElement.removeChild(this.#window.element);
      this.#window = null;
    } else {
      const windowElem = document.createElement('div');
      this.element.parentElement.appendChild(windowElem);
      this.#window = new Window(windowElem);
    }
  }
}

class Window extends DesktopComponent {
  constructor(element) {
    element.classList.add('window');
    super(element);
  }
}
