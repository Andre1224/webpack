
class Plugin1 {
    apply(compiler){
        compiler.hooks.emit.tap('Plugin1', (compilation) => {
            console.log('emit.tap 111')
        })

        compiler.hooks.emit.tapAsync('Plugin1', (compilation, cb) => {
            setTimeout(() => {
                console.log('emit.tapAsync 222')
                cb()
            }, 2000)
        })
        compiler.hooks.emit.tapPromise('Plugin1', (compilation) => {
            return new Promise((resolve => {
                setTimeout(() => {
                    console.log('emit.tapPromise 333')
                    resolve()
                }, 2000)
            }))

        })

        compiler.hooks.afterEmit.tap('Plugin1', (compilation) => {
            console.log('afterEmit.tap 444')
        })
        compiler.hooks.done.tap('Plugin1', (stats) => {
            console.log('done.tap 555')
        })
    }
}

module.exports =  Plugin1;