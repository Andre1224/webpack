const myWebpack = require('../lib/myWebpack2')
const config = require('../config/webpack.config')

const compiler = myWebpack(config);

// 开始打包
compiler.run()