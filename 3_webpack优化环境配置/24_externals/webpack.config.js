const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // loader配置

        ]
    },
    plugins: [
        // plugins配置
        // html-webpack-plugin
        // 功能：默认创建一个空的html，自动引入打包输出所有资源(js/css)
        // 需求：需要有结构的html文件
        new HtmlWebpackPlugin({
            template: './src/index.html' // 复制'./src/index.html'文件并自动引入打包输出的所有资源(js/css)
        })
    ],
    mode: 'production',
    externals: {
        // 忽略jQuery被打包 库名: '包名'
        jquery: 'jQuery'
    }
}