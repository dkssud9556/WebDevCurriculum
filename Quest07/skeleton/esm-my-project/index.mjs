import {EsmUtilClass, esmUtilFunction} from '../esm-package/index.mjs';
import {CjsUtilClass, cjsUtilFunction} from '../cjs-package/index.js';

const esmUtilClass = new EsmUtilClass(3);
console.log(esmUtilClass.double());

console.log(esmUtilFunction('hello!'));

const cjsUtilClass = new CjsUtilClass(3);
console.log(cjsUtilClass.double());

console.log(cjsUtilFunction('hello!'));