const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // loader配置
            {
                // 匹配哪些文件
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                exclude: /\.(css|js|html)$/,
                loader: 'file-loader',
                options: {
                    esModule: false // 字体文件需要使用commonjs
                },
                type: 'javascript/auto' // 语言类型自适应，禁用es6自动调整为commonjs
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    mode: 'development'
};