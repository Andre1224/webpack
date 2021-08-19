const { getAst, getCode, getDeps } = require('./parser')
const fs =require('fs')
const path =require('path')

// function myWebpack(config){
//     return new Compiler(config)
// }

class Compiler {
    constructor(options = {}) {
        this.options = options
        // 所有依赖容器
        this.modules = []
    }
    // 启动webpack打包
    run() {
        // 入口文件路径
        const filePath = this.options.entry
        // 第一次构建得到入口文件信息
        const fileInfo = this.build(filePath)

        this.modules.push(fileInfo)
        // 遍历所有依赖
        this.modules.forEach((fileInfo) => {
            /*
            { './add':
               'D:\\JetBrains\\WebStorm 2020.3.2\\workspace\\Learning\\webpack资源构建\\webpack\\myWebpack\\src\\add',
              './count':
               'D:\\JetBrains\\WebStorm 2020.3.2\\workspace\\Learning\\webpack资源构建\\webpack\\myWebpack\\src\\count'
            }*/
            // 去除当前文件的所有依赖
            const deps = fileInfo.deps
            // 遍历
            for (const relativePath in deps) {
                // 依赖的绝对路径
                const absolutePath = deps[relativePath];
                // 对依赖文件进行处理
                const fileInfo = this.build(absolutePath)
                // 将处理后的结果添加到modules中，后续的遍历就会继续遍历它
                this.modules.push(fileInfo)
            }

        })

        // console.log(this.modules)

        // 将依赖整理更好的依赖关系图
        const depsGraph = this.modules.reduce((graph, module) => {
            return {
                ...graph,
                [module.filePath] : {
                    code: module.code,
                    deps: module.deps
                }
            }
        }, {})
        console.log(depsGraph)

        this.generate(depsGraph)
    }

    build(filePath){
        // 将文件解析为ast
        const ast = getAst(filePath)
        // 获取ast中的所有依赖
        const deps = getDeps(ast, filePath)
        // 将ast解析成code
        const code = getCode(ast)

        return {
            // 文件路径
            filePath,
            // 当前文件的所有依赖
            deps,
            // 当前文件解析后的代码
            code
        }
    }

    // 生成输出资源
    generate (depsGraph) {

        /*
            var _add = _interopRequireDefault(require("./add"));
            var _count = _interopRequireDefault(require("./count"));
         */
        const bundle = `
        (function(depsGraph) {
            // require目的：为了加载入口文件
            function require(module) {
                 // 模块内部的require函数
                function localRequire(relativePath){
                    // 为了找到要引入模块的绝对路径，通过require加载
                    return require(depsGraph[module].deps[relativePath])
                }
                // 定义暴露对象（将来我们模块要暴露的内容）
                var exports = {}
                
                    console.log('code:********', code)  
                (function(require, exports, code){
                    eval(code)
                })(localRequire, exports, depsGraph[module].code)
                // 作为require函数的返回值返回出去
                // 后面的require函数能得到暴露的内容
                return exports;
            }
            require('${this.options.entry}')
        })(${JSON.stringify(depsGraph)})
        `
        // 生成输出文件的绝对路径
        const filePath = path.resolve(this.options.output.path, this.options.output.filename)
        // 写入文件
        console.log('*****************************************************************')
        console.log('filePath:', filePath)
        fs.writeFileSync(filePath, bundle, 'utf-8')
}


}

module.exports = Compiler;