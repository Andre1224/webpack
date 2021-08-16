// // import '../css/index.css';
// import { mul } from './test';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5, 6));


/*
  通过js代码 让某个文件被淡出打包成一个chunk
 */

import (/* webpackChunkName: 'test' */'./test')
  .then(({ mul, reduce }) => {
    // eslint-disable-next-line
    console.log(mul(5, 33))
    // eslint-disable-next-line
    console.log(reduce(5, 33))
  })
  .catch(() => {
    // eslint-disable-next-line
    console.log('文件加载失败')
  })