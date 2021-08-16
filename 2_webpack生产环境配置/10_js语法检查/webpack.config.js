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
            /*
                语法检查：eslint-loader eslint
                    注意：只检查源代码，不检查第三方库
                    设置检查规则：
                        package.json中eslintConfig中设置
                        规则 airbnb -->
                        依赖 -->  eslint-config-airbnb-base
                                 eslint
                                 eslint-plugin-import
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader', // eslint eslint-loader
                options: {
                    fix: true   // 自动修复eslint错误
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}