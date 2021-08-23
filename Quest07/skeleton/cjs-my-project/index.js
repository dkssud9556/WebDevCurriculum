const {cjsUtilFunction, CjsUtilClass} = require('../cjs-package/index');
async function useEsmPackage () {
  const {esmUtilFunction, EsmUtilClass} = await import('../esm-package/index.mjs');

  const esmUtilClass = new EsmUtilClass(3);
  console.log(esmUtilClass.double());

  console.log(esmUtilFunction('hello!'));
}

useEsmPackage();

const cjsUtilClass = new CjsUtilClass(3);
console.log(cjsUtilClass.double());

console.log(cjsUtilFunction('hello!'));