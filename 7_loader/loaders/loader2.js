// loader本质上是一个函数

module.exports = function (content, map, meta) {
    console.log('loader2: ' + content);

    return content;
}

module.exports.pitch = function () {
    console.log('pitch2')
}