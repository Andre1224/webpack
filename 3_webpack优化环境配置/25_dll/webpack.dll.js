
/*
    使用dll技术对某些第三方库（如Vue、react、jquery等）单独进行打包
        当运行webpack时u，默认查找webpack.config.js配置文件
        需要运行webpack.dll.js文件时 --> webpack --config webpack.dll.js
 */

const { resolve } = require('path')
const webpack = require('webpack')
module.exports = {
    entry: {
        // 最终打包成的名字: [要打包的库]
        jquery: ['jquery'],
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dll'),
        library: '[name]_[hash:16]', // 打包的库里面向外暴露出去的内容叫什么名字
    },
    plugins: [
        // 打包生成一个manifest.json --> 提供和jquery映射
        new webpack.DllPlugin({
            name: '[name]', // 映射库暴露的内容名称
            path: resolve(__dirname, 'dll/manifest.json') // 输出文件路径
        })
    ]
}