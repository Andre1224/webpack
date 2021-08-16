const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


/*
    entry: 入口起点
    1.string --> './src/js/index.js'
        打包形成一个chunk，输出一个bundle,此时chunk默认名称为main
    2.array --> ['./src/js/index.js', './src/js/add.js']
        多入口，所有入口文件最终只会形成一个chunk，输出一个bundle文件
        只有在HMR功能中让html热更新功能生效
    3.object --> {index: './src/js/index.js', add: './src/js/add.js'}
        多入口，有几个入口文件就形成几个chunk，输出几个bundle，此时chunk名称是key
        其他写法 -->  {index: ['./src/js/index.js', './src/count.js'], add: './src/js/add.js'}
            将index。js与count.js打包在一起，add.js单独打包
 */
module.exports = {
    entry: {
        index: ['./src/js/index.js', './src/js/count.js'],
        add: './src/js/add.js'
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development',
}