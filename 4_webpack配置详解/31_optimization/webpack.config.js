const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/[name].js',
        path: resolve(__dirname, 'build'),
    },
    module: {
      rules: [
          // loader配置
          {
              test: /\.css$/,
              // 多个loader用use
              use: ['style-loader', 'css-loader']
          }
      ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30 * 1024, // 分割的chunk最小为30kb
            maxSize: 0, // 最大没有限制
            minChunks: 1, // 要提取的chunk最少被引用1次
            maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数据量
            maxInitialRequests: 3, // 入口js文件最大并行请求数量
            automaticNameDelimiter: '~', // 名称连接符
            name: true, // 可以使用命名规则
            cacheGroups: { // 分割chunk的组
                // node_modules文件会被打包到vendors组的chunk中。 --> vendors~xxx.js
                // 满足上面的公共规则
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    // 优先级
                    priority: -10
                },
                default: {
                    // 要提取的chunk最少被引用2次
                    minChunks: 2,
                    // 优先级
                    priority: -20,
                    // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
                    reuseExistingChunk: true
                }
            }
        }
    }
}