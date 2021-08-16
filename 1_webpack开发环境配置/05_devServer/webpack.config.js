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
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'// 将less文件编译成css文件，需要下载less和less-loader
                ]
            },
            {
                // 处理图片资源
                test: /\.(jpg|png|gif|jpeg)$/,
                // 使用一个loader => loader: 'url-loader'
                loader: 'url-loader', // 依赖与url-loader file-loader
                options: {
                    // 小于8kb，就会被base64处理
                    // 优点：减少请求数量（减轻服务器压力）
                    // 缺点：图片体积会变大
                    limit: 8 * 1024,
                    // 给图片重命名，名字
                    name: '[name][hash:10].[ext]',
                    outputPath: 'static/img',
                    // 问题：url-loader默认使用es6模块解析,而html-loader模块使用commonjs接续
                    // 解决：关闭url-loader的es6模块，使用commonjs解析
                    esModule: false
                },
                type: 'javascript/auto'
            },
            {
                test: '/.\html$/',
                // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
                loader: 'html-loader'
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
    mode: 'development',
    // 开发服务器devServer:用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
    // 特点：只会在内存中编译打包，不会有任何输出
    // 启动devServer指令：npx webpack server
    devServer: {
        // 项目构建后路径
        contentBase: resolve(__dirname, 'build'),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开浏览器
        open: true
    }
}