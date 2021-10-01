class ElementCreator {
  static create({
    tag = 'div', textContent = '', classList = [], children = [], parent,
  }) {
    const result = document.createElement(tag);
    result.classList.add(...classList);
    result.textContent = textContent;
    children.forEach((child) => result.appendChild(child));
    if (parent) {
      parent.appendChild(result);
    }
    return result;
  }

  static createTextArea({
    classList = [], textContent = '', children = [], parent,
  }) {
    const result = document.createElement('textarea');
    result.classList.add(...classList);
    result.textContent = textContent;
    children.forEach((child) => result.appendChild(child));
    if (parent) {
      parent.appendChild(result);
    }
    return result;
  }
}
// # sourceMappingURL=elementCreator.js.map
