const { resolve } = require('path')
const  MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/*
    缓存：
        babel缓存
            cacheDirectory: true
            --> 让第二次打包构建更快
        文件资源缓存
            hash: 每次webpack构建时会生成一个唯一hash值
                问题：因为js与css使用同一个hash值重新打包会是所有缓存失效
            chunkhash: 根据chunk生成hash，如果打包来源于同一个chunk，那么打包的hash一样
                问题：因为css是在js中被引入，所以同属于一个chunk，hash也一样
            contenthash: 根据文件内容生成hash值，不同文件hash值一定不一样
            --> 让代码上线运行缓存更好使用
 */

// 指定环境
// process.env.NODE_ENV = 'production'
const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        // 需要在package.json中定义css浏览器兼容规则browserslist
        // "browserslist": {
        //     "development": [
        //         "last 1 chrome version",
        //         "last 1 firefox version",
        //         "last 1 safari version"
        //     ],
        //     "production": [
        //         ">0.2%",
        //         "not dead",
        //         "not op_mini all"
        //     ]
        // },
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: ['postcss-preset-env']
            }
        }
    },
]

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            /*
                   * 正常来说，一个文件只能被一个loader处理
                   * 当一个文件需要被多个loader处理，一定要指定loader的执行顺序：
                   *   先执行eslint 再执行babel
                   * */
            {
                // 需要在package.json中eslintConfig --> airbnb
                // "eslintConfig": {
                //     "extends": "airbnb-base"
                // }
                test: /\.js$/,
                exclude: /node_module/,
                loader: 'eslint-loader',
                // 优先执行
                enforce: 'pre',
                options: {
                    fix: true
                }
            },
            // oneOf中的loader只会匹配一个
            {
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [
                            // MiniCssExtractPlugin.loader,
                            // 'css-loader',
                            // {
                            //     // 需要在package.json中定义css浏览器兼容规则browserslist
                            //     loader: 'postcss-loader',
                            //     options: {
                            //         ident: 'postcss',
                            //         plugins: () => [
                            //             require('postcss-preset-env')
                            //         ]
                            //     }
                            // }
                            ...commonCssLoader
                        ]
                    },
                    {
                        test: /\.less$/,
                        use: [
                            // MiniCssExtractPlugin.loader,
                            // 'css-loader',
                            // {
                            //     // 需要在package.json中定义css浏览器兼容规则browserslist
                            //     loader: 'postcss-loader',
                            //     options: {
                            //         ident: 'postcss',
                            //         plugins: () => [
                            //             require('postcss-preset-env')
                            //         ]
                            //     }
                            // },
                            ...commonCssLoader,
                            'less-loader'
                        ]
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_module/,
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        // 按需加载
                                        useBuiltIns: 'usage',
                                        // 指定core-js
                                        corejs: {
                                            version: 3
                                        },
                                        // 指定兼容性做到哪个版本的浏览器
                                        targets: {
                                            chrome: '60',
                                            firefox: '60',
                                            ie: '10',
                                            safari: '10',
                                            edge: '17'
                                        }
                                    }
                                ]
                            ],
                            // 开启babel缓存
                            // 第二次构建时会读取之前的缓存
                            cacheDirectory: true
                        }
                    },
                    {
                        test: /\.(jpg|jpeg|png|gif|bmp)/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            name: '[hash:10].[ext]',
                            outputPath: 'images',
                            esModule:false
                        },
                        type: 'javaScript/auto'
                    },
                    {
                        test: /\.html$/,
                        loader: 'html-loader',
                    },
                    {
                        exclude: /\.(js|css|less|scss|html|jpg|jpeg|png|gif|bmp)/,
                        loader: 'file-loader',
                        options: {
                            outputPath: 'media'
                        }
                    }
                ]
            },

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/built.[contenthash:10].css'
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    mode: 'development',
    devtool: 'source-map'
}