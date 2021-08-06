const canDrag = element => {
  const moveAt = ({element, xPosition, yPosition}) => {
    element.style.left = xPosition + 'px';
    element.style.top = yPosition + 'px';
  }

  element.onmousedown = e => {
    const {offsetX, offsetY} = e;

    moveAt({
      element,
      xPosition: e.pageX - offsetX,
      yPosition: e.pageY - offsetY
    });

    element.parentElement.onmousemove = e => {
      moveAt({
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

const canSetUp = element => ({
  setUpTo: parentElement => {
    element.classList.add('desktop-element');

    const appendToParentElement = () => {
      parentElement.appendChild(element);
    }

    const setRandomPosition = () => {
      if (element.parentElement === null) {
        throw new Error('should be appended before setting position');
      }
      element.style.left = (Math.random() * (parentElement.offsetWidth - element.offsetWidth)) + parentElement.offsetLeft + 'px';
      element.style.top = (Math.random() * (parentElement.offsetHeight - element.offsetHeight)) + parentElement.offsetTop + 'px';
    }

    appendToParentElement();
    setRandomPosition();
  }
})

const canOpenWindow = element => {
  let folderWindow = null;

  const openFolder = () => {
    folderWindow = windowComponent(document.createElement('div'));
    folderWindow.setUpTo(element.parentElement);
  }

  const closeFolder = () => {
    folderWindow.disappear();
    folderWindow = null;
  }

  element.ondblclick = e => {
    if (folderWindow) {
      closeFolder();
    } else {
      openFolder();
    }
  }
}

const desktop = element => {
  let desktopComponents = [];

  const desktopBehaviors = () => ({
    addDesktopComponents: (count, desktopComponentFactoryFunc) => {
      const makeDesktopComponents = () => new Array(count)
        .fill(0).map(() => desktopComponentFactoryFunc(document.createElement('div')));

      desktopComponents = desktopComponents.concat(makeDesktopComponents());
    },
    setUpComponents: () => {
      desktopComponents.forEach(desktopComponent => desktopComponent.setUpTo(element));
    }
  });

  return Object.assign({}, desktopBehaviors());
}

const desktopComponent = element => {
  canDrag(element);
  return Object.assign({}, canSetUp(element));
}

const iconComponent = element => {
  element.classList.add('icon');

  return Object.assign({}, desktopComponent(element));
}

const windowComponent = element => {
  element.classList.add('window');

  const windowBehaviors = () => ({
    disappear: () => element.parentElement.removeChild(element)
  });

  return Object.assign({}, desktopComponent(element), windowBehaviors());
}

const folderComponent = element => {
  element.classList.add('folder');

  canOpenWindow(element);

  return Object.assign({}, desktopComponent(element));
}