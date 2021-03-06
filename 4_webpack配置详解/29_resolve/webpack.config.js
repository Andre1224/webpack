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
    mode: 'development',
    // 解析模块的规则
    resolve: {
        // 配置解析模块路径别名
            // 优点：简写
            // 缺点：缺少提示
        alias: {
            $css: resolve(__dirname, 'src/css')
        },
        // 配置省略文件路径的后缀名
        extensions: ['.js', '.css', '.json'],
        // 告诉webpack解析模块去哪个目录找
        modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
    }
}