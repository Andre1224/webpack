const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
                // 使用哪些loader进行处理
                use: [
                    // use数组中loader执行顺序：从右到左，从下到上，依次执行
                    'style-loader',// 创建style标签，将js中的样式资源插入进行，添加到head中生效
                    'css-loader' // 将css文件编译commonjs模块加载js中，里面内容是样式字符串
                ]
            },
            {
                exclude: '/\.(css|js|html)$/',
                loader: 'file-loader'
            }
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
    mode: 'development'
}