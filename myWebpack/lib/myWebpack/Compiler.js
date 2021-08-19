const { getAst, getCode, getDeps } = require('./parser')

function myWebpack(config){
    return new Compiler(config)
}

class Compiler {
    constructor(options = {}) {
        this.options = options
    }
    // 启动webpack打包
    run() {
        // 入口文件路径
        const filePath = this.options.entry
        // 将文件解析为ast
        const ast = getAst(filePath)
        // 获取ast中的所有依赖
        const deps = getDeps(ast, filePath)
        // 将ast解析成code
        const code = getCode(ast)

        console.log(ast)
        console.log(deps)
        console.log(code)
    }

}

module.exports = myWebpack;