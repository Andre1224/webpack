// loader本质上是一个函数
const { getOptions } = require('loader-utils') // 获取webpack.config.js中配置的options
const { validate } = require('schema-utils') // 获取webpack.config.js中配置的options
const schema = require('./schema.json')

module.exports = function (content, map, meta) {
    console.log('loader3: ' + content);
    // 获取options
    const options = getOptions(this)
    console.log('options: ' , options)

    // 校验options
    validate(schema, options, {
        name: 'loader3'
    })
    return content;
}

module.exports.pitch = function () {
    console.log('pitch3')
}