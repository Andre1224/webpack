import '../font/iconfont.css'
import '../css/index.less'
import print from "./print";

console.log('index.js文件被加载……')
function add(x, y){
    return x + y
}

console.log(add(10, 60));

print();

if (module.hot) {
    // 一旦module.hot为true，说明开启了HMR功能。 --> 让HMR功能代码生效
    module.hot.accept('./print.js', function () {
        // 方法会监听print.js文件的变化，一旦发生变化，其他默认不会重新打包构建
        // 会执行后面的回调函数
        print()
    })
}