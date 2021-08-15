/*
    HMR: hot module replacement 热模块替换 / 模块热替换
        作用：一个模块发生变化，智慧重新打包这一个模块，极大提高构建速度

        样式文件:可以使用HMR，因为style-loader内部实现了
        js文件:默认没有HMR功能 --> 需要修改js代码，添加支持HMR功能的代码
            注意：HMR功能对js处理，只能处理非入口js文件的其他文件
        html文件:默认没有HMR功能，同时会导致html文件不能热更新
            解决：在entry中加入index.html地址
 */
const { resolve }  = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    target: 'web', // 建立热更新websocket
    // entry: './src/js/index.js',
    entry: ['./src/js/index.js','./src/index.html'],
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
        open: true,
        hot: true // 开启HMR功能
    },
    mode:'development'
}