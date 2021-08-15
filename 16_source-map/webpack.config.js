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
                // oneOf中的loader只会匹配一个
                oneOf: [
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
    mode:'development',
    devtool: 'hidden-source-map'

}

/*
    source-map: 一种提供源代码到构建后代码映射技术（如果后代码出错，通过映射关系可以追踪源代码错误）

        [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

        source-map： 外部
            提供错误代码的准确信息 和 源代码的错误位置
        inline-source-map: 内联：只生成一个内联source-map
            提供错误代码的准确信息 和 源代码的错误位置
        hidden-source-map: 外部
            提供错误代码的原因，但是没有提示错误的位置，不能追踪源代码错误，只能提示到构建够的代码位置
        eval-source-map: 内联: 每个文件都生成一个source-map,都在eval中
            提供错误代码的准确信息 和 源代码的错误位置

        nosources-source-map: 外部
            提供错误代码的准确信息，但是没有源代码信息
        cheap-source-map: 外部:
            提供错误代码的准确信息 和 源代码的错误位置，错误信息只提示到行，不能精确到列
        cheap-module-source-map: 外部
            提供错误代码的准确信息 和 源代码的错误位置，错误信息只提示到行，不能精确到列
            module会将loader的source-map加进来

        内联 和 外部 的区别：
            1.外部生成单独map文件，内联不会
            2.内联构建速度更快

        开发环境：速度快，调试更友好
            速度快（eval>inline>cheap>.....）
                eval-cheap-source-map
                eval-source-map
            调试更友好
                source-map
                cheap-module-source-map
                cheap-source-map
        生产环境：是否隐藏源代码？调试要不要更友好
            nosources-source-map
            hidden-source-map
 */