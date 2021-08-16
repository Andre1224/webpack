const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/[name].js',
        path: resolve(__dirname, 'build'),
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    module: {
      rules: [
          // loader配置
          {
              test: /\.css$/,
              // 多个loader用use
              use: ['style-loader', 'css-loader']
          },
          {
              test: /\.js$/,
              // 排除node_module下面的js文件
              exclude: /node_module/,
              // 只检查src下的js文件
              include: resolve(__dirname, 'src'),
              // 单个loader用loader
              loader: 'eslint-loader',
              options: {}
              // enforce: 'pre', // 优先执行
              // enforce: 'post', // 延后执行
          },
          {
              // 以下配置只会生效一个
              oneOf: []
          }
      ]
    },
    mode: 'development',
}