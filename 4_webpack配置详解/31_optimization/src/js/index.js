// import '../css/index.css'
import '$css/index.css'
console.log('index.js文件被加载')

import(/* webpackChunkName: 'importFromTest' */'./test').then(({add}) => {
    console.log(add(5, 10))
})
