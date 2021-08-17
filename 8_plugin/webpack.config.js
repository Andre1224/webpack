// const plugin1 = require('./Plugin1')
const plugin2 = require('./Plugin2')

module.exports = {
    mode: 'development',
    plugins: [
        // new plugin1(),
        new plugin2(),
    ]
}