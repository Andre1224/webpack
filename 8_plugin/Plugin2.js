
class Plugin2 {
    apply(compiler){
        compiler.hooks.thisCompilation.tap('Plugins', (compilation) => {
            debugger
            console.log(compilation)
        })
    }
}

module.exports =  Plugin2;