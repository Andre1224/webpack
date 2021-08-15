const { resolve } = require('path')
const  MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 指定环境
process.env.NODE_ENV = 'production'
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
            ident: 'postcss',
            plugins: () => [
                require('postcss-preset-env')
            ]
        }
    },
]

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
            {
                test: /\.js$/,
                exclude: /node_module/,
                loader: 'babel-loader',
                options: {
                    preset: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage',
                                        corejs: {
                                            version: 3
                                        },
                                        targets: {
                                            chrome: '60',
                                            firefox: '60',
                                            ie: '10',
                                            safari: '10',
                                            edge: '17'
                                        }
                                    }
                                ]
                    ]
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
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
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
    mode: 'production'
}