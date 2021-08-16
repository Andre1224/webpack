/*
    开发环境配置：运行基础环境
        项目运行指令：
            webpack 会将打包结果输出
            npx webbpack serve 只会在内存中编译，不输出结果
 */
const { resolve }  = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // loader配置
            {
                // 处理less
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                // 处理css
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                // 处理图片资源
                test: /\.(jpg|jpeg|png|gif|bmp)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024, // 小于8kb的转换为base64
                    name: '[hash:10].[ext]', // 重命名：文件名10位哈希值.文件扩展名
                    esModule: false, // 关闭es6模块。使用commonjs
                    outputPath: 'images'
                },
                type: 'javascript/auto',

            },
            {
                // 处理html的img资源
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                // 处理其他资源，当做文件引入
                exclude: /\.(html|js|css|less|jpg|jpeg|png|gif|bmp)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    esModule: false,
                    outputPath: 'media'
                },
                type: 'javascript/auto',
            }
        ]
    },
    plugins:[
        // 插件配置
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true
    },
    mode:'development'
}