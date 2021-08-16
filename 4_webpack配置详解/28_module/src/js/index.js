// import add from "./add";
// import count from "./count";
console.log('index.js文件被加载')

import('./add').then(({default: add}) => {
    console.log(add(5, 30))
})
// console.log(add(1, 3, 6))
// console.log(count(10, 6))