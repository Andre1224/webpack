const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const { validate } = require('schema-utils')
const globby = require('globby')
const schema = require('./schema.json')
const webpack = require('webpack')
const { RawSource } = webpack.sources
const readFile = promisify(fs.readFile)

class CopyWebpackPlugin {
    constructor(options = {}) {
        this.options = options

        // 验证options是否符合规范
        validate(schema, options, {
            name: 'CopyWebpackPlugin'
        })
    }

    apply(compiler){
        // 初始化CopyWebpackPlugin
        compiler.hooks.thisCompilation.tap('CopyWebpackPlugin', (compilation) => {
            // 添加的hooks
            compilation.hooks.additionalAssets.tapAsync('CopyWebpackPlugin', async (cb) => {
                // 将from中的资源复制到to中，并输出去
                const  { from, ignore } = this.options
                const to = this.options.to ? this.options.to : '.';

                //  context就是webpack配置,运行指令的目录
                const context = compiler.options.context; // process.cwd()
                // 将输入路径变为绝对路径
                const absoluteFrom = path.isAbsolute(from) ? from : path.resolve(context, from)

                // 1.过滤掉ignore的文件
                // globby(要处理的文件夹, options)
                const paths = await globby(absoluteFrom.replace(/\\/g,'/'), { ignore })
                console.log(paths) // 所有要加载的文件路径
                // 2.读取paths中的资源
                const filesAwait = await Promise.all(
                    paths.map(async (item) => {
                        // 读取文件
                        const data = await readFile(item)
                        // basename得到最后的文件名称
                        const relativePath = path.basename(item)
                        // 和to属性结合
                        // 没有to --> index.css
                        // 有to --> css/index.css
                        const filename = path.join(to, relativePath)
                        return {
                            data, // 文件数据
                            filename // 文件名称
                        }
                    })
                )

                // 3.生成webpack格式的资源
                const assets = filesAwait.map((file) => {
                    const source = new RawSource(file.data)

                    return {
                        source,
                        filename: file.filename
                    }
                })
                // 4.添加compilation中，输出出去
                assets.forEach((asset) => {
                    compilation.emitAsset(asset.filename, asset.source)
                })

                cb();
            } )
        })
    }
}

module.exports = CopyWebpackPlugin;