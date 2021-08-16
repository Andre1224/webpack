console.log('index.js被加载了')

// import { mul } from './test'


document.getElementById('btn').onclick = function () {
    // 懒加载：当文件被调用时才加载
    // 预加载prefetch：会在使用之前，提前加载js文件（等其他资源加载完毕，浏览器空闲的时候再加载）
    // 正常加载可以认为是并行加载（同一时间加载多个文件）
    import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test')
        .then(({ mul }) => {
            console.log(mul(5, 44))
        })
}