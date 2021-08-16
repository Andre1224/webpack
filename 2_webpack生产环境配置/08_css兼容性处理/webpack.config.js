const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin =  require('mini-css-extract-plugin')

// 设置nodejs环境变量
process.env.NODE_ENV = 'development';

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
                    'css-loader',
                    /*
                    * css兼容性处理：postcss --> postcss-loader postcss-preset-env
                    * 使用loader的默认配置 loader: 'postcss-loader'，
                    * */
                    {
                        loader: 'postcss-loader',
                        // 修改loader的配置
                        options: {
                            // postcss插件
                            // 帮助postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
                            /*
                            "browserslist": {
                                // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = 'development'
                                "development": [
                                  "last 1 chrome version",
                                  "last 1 firefox version",
                                  "last 1 safari version"
                                ],
                                // 生产环境：默认是看生产环境
                                "production": [
                                  ">0.2%",
                                  "not dead",
                                  "not op_mini all"
                                ]
                              }
                            */
                            postcssOptions: {
                                plugins: ['postcss-preset-env']
                            }
                        }
                    }

                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/built.css' // 重命名css文件的路径和文件名
        })
    ],
    mode: 'development'
}