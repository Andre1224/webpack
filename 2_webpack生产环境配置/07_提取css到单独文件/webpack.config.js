const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin =  require('mini-css-extract-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader']
                use: [
                    MiniCssExtractPlugin.loader, // loader取代style-loader。作用：提取js中的css成单独文件
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 单独提取css
        new MiniCssExtractPlugin({
            filename: 'css/built.css' // 重命名css文件的路径和文件名
        })
    ],
    mode: 'development'
}