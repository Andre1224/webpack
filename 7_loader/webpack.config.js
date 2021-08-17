const path = require('path')

module.exports = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js/,
                // loader: path.resolve(__dirname, 'loaders', 'loader1')
                // loader: 'loader1'
                // use: [
                //     'loader1',
                //     'loader2',
                //     {
                //         loader: 'loader3',
                //         options: {
                //             name: 'true',
                //             age: 18
                //         }
                //     }
                // ],
                loader: 'babelLoader',
                options: {
                    presets: [
                        '@babel/preset-env'
                    ]
                }
            }
        ]
    },
    // 配置loader解析骨子额
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'loaders')
        ]
    }
}