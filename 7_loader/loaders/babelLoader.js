const { getOptions } = require('loader-utils') // 获取webpack.config.js中配置的options
const { validate } = require('schema-utils') // 校验webpack.config.js中配置的options
const babel = require('@babel/core')
const util = require('util')

const babelSchema = require('./babelSchema.json')

// babel。transform用来编译代码的方法
// 是一个普通异步方法
// util.promisify将普通异步方法转换成基于promise的异步方法
const transform = util.promisify(babel.transform)

module.exports = function (content, map, meta) {
    // 获取loader配置
    const options = getOptions(this) || {};
    // 校验babel的options的配置
    validate(babelSchema, options, {
        name: 'babel Loader'
    });

    // 创建异步
    const callback = this.async()

    // 使用babel
    transform(content, options)
        .then(({code, map}) => callback(null, code, map, meta))
        .catch((e) => callback(e))

}