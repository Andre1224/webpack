// const plugin1 = require('./Plugin1')
// const plugin2 = require('./Plugin2')
const CopyWebpackPlugin = require('./CopyWebpackPlugin')
module.exports = {
    mode: 'development',
    plugins: [
        // new plugin1(),
        // new plugin2(),
        new CopyWebpackPlugin({
            from: 'public',
            to: 'css',
            ignore: ['**/index.html']
        })
    ]
}