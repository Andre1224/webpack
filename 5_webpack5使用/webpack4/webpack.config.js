const { resolve } = require('path')

module.exports = {
    entry: './src/js/index',
    output: {
        filename: 'js/[name]_[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: []
    },
    plugins: [],
    mode: 'production'
}