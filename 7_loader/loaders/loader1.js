// loader本质上是一个函数

// 同步loader
// module.exports = function (content, map, meta) {
//     console.log('loader1: ' + content);
//
//     return content;
// }

// module.exports = function (content, map, meta) {
//     console.log('loader1: ' + content);
//     this.callback(null, content, map, meta)
// }

// 异步loader
module.exports = function (content, map, meta) {
    console.log('loader1: ' + content);

    const callback = this.async();
    setTimeout(() => {
        callback(null, content)
    }, 2000)
}

module.exports.pitch = function () {
    console.log('pitch1')
}