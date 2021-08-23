class CjsUtilClass {
  constructor(foo) {
    this.foo = foo;
  }

  double() {
    return this.foo * 2;
  }
}

const cjsUtilFunction = str => {
  return str.toUpperCase();
};

module.exports = {
  CjsUtilClass,
  cjsUtilFunction
};