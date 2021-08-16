# webpack性能优化

## 开发环境性能优化
* ### 优化打包构建速度
    * HMR:一个模块发生变化只重新打包发生变化的模块
        * css: 使用style-loader默认启用HMR
        * js: 在入口文件添加代码启用HMR
           ```javascript
              if(module.hot){
                module.hot.accept('./test.js', function(){
                  test()
                })
              };
           ```
       * html: 在webpack.config.js中增加target: 'web',启用websocket热更新，通常html文件只有一个，不需要HMR
* ### 优化代码调试
    * source-map:一种提供源代码到构建后代码映射技术（如果后代码出错，通过映射关系可以追踪源代码错误）
       * devtool: [inline-|hidden-|eval-][nosources-][cheap-[module-]] source-map
           * source-map:(外部)提供错误代码的准确信息 和 源代码的错误位置
           * inline-source-map:(内联)只生成一个内联source-map
           提供错误代码的准确信息 和 源代码的错误位置
           * hidden-source-map:(外部)提供错误代码的原因，但是没有提示错误的位置，不能追踪源代码错误，只能提示到构建够的代码位置
           * eval-source-map:(内联):每个文件都生成一个source-map,都在eval中
           提供错误代码的准确信息和源代码的错误位置
           * nosources-source-map:(外部)提供错误代码的准确信息，但是没有源代码信息
           * cheap-source-map:(外部):提供错误代码的准确信息和源代码的错误位置，错误信息只提示到行，不能精确到列
           * cheap-module-source-map:(外部)提供错误代码的准确信息 和 源代码的错误位置，错误信息只提示到行，不能精确到列
           module会将loader的source-map加进来
             
           * 内联 和 外部 的区别：
             
                  1.外部生成单独map文件，内联不会
                  2.内联构建速度更快

                  开发环境：速度快，调试更友好
                  速度快（eval>inline>cheap>.....）
                      eval-cheap-source-map
                      eval-source-map
                  调试更友好
                      source-map
                      cheap-module-source-map
                      cheap-source-map
                      --> eval-source-map / eval-cheap-module-source-map
                  生产环境：是否隐藏源代码？调试要不要更友好
                      nosources-source-map 隐藏所有代码
                      hidden-source-map 隐藏源代码，显示构建后代码
                      --> source-map / cheap-module-source-map

### 生产环境性能优化
* 优化打包构建速度
    * oneOf: 文件匹配唯一loader(/\.js$/文件需要eslint-loader和babel-loader两个loader，与oneOf功能冲突，所以将eslint-loader放在oneOf外面)
    * babel缓存: cacheDirectory: true --> 让第二次打包构建更快

        ```javascript
            {
                test: /\.js$/,
                exclude: /node_module/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'usage',
                                corejs: {
                                    version: 3
                                },
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '10',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ],
                    // 开启babel缓存
                    // 第二次构建时会读取之前的缓存
                    cacheDirectory: true
                }
            }
        ```        
    * 多进程打包
        ```javascript
            /*
                开启多进程打包，依赖于thread-loader
                放置在需要多进程的loader后
                进程启动大约为600ms，进程通信也有开销
                只有工作消耗时间比较长，才需要多进程打包
            */
            // 'thread-loader',
            {
                loader: 'thread-loader',
                options: {
                    workers: 2 // 两个进程
                }
            }
        ```
    * externals
        * 通过外部cdn引入的库不需要打包，使用externals排除在外
        ```javascript
            externals: {
                // 忽略jQuery被打包 库名: '包名'
                jquery: 'jQuery'
            }
        ```
    * dll
        * 将不需要打包的库使用dll先单独打包好，直接引入
        ```javascript
             /*
                使用dll技术对某些第三方库（如Vue、react、jquery等）单独进行打包
                当运行webpack时，默认查找webpack.config.js配置文件
                需要运行webpack.dll.js文件时 --> webpack --config webpack.dll.js
            */
            const { resolve } = require('path')
            const webpack = require('webpack')
            module.exports = {
                entry: {
                    // 最终打包成的名字: [要打包的库]
                    jquery: ['jquery'],
                },
                output: {
                    filename: '[name].js',
                    path: resolve(__dirname, 'dll'),
                    library: '[name]_[hash:16]', // 打包的库里面向外暴露出去的内容叫什么名字
                },
                plugins: [
                    // 打包生成一个manifest.json --> 提供和jquery映射
                    new webpack.DllPlugin({
                        name: '[name]', // 映射库暴露的内容名称
                        path: resolve(__dirname, 'dll/manifest.json') // 输出文件路径
                    })
                ]
            }
        ```
* 优化代码运行的性能
    * 缓存
        * hash: 每次webpack构建时会生成一个唯一hash值
          问题：因为js与css使用同一个hash值重新打包会使所有缓存失效
        * chunkhash: 根据chunk生成hash，如果打包来源于同一个chunk，那么打包的hash一样
          问题：因为css是在js中被引入，所以同属于一个chunk，hash也一样
        * contenthash: 根据文件内容生成hash值，不同文件hash值一定不一样 --> 让代码上线运行缓存更好使用
    * tree shaking: 构建代码时移除没有被调用的函数
        * 需要使用ES6模块化
        * production模式下tree shaking自动启用(UgligfyPlugin)
        * 问题：可能会把其他没有引用的文件清除
            ```
                在package.json中增加配置，写入不需要清楚的文件格式
                "sideEffects": ["*.css", "*.less"]
            ```
    * code split
        * 单入口
            ```javascript
                optimization: {
                      splitChunks: {
                        chunks:'all'
                      }
                }
            ```
            ```javascript
                /*
                   通过js代码 让某个文件被单独打包成一个chunk
                   通过import引入的方式执行代码，不会被判定为同一个chunk
                */
                import (/* webpackChunkName: 'test' */'./test')
                    .then(({ mul, reduce }) => {
                        // eslint-disable-next-line
                        console.log(mul(5, 33))
                        // eslint-disable-next-line
                        console.log(reduce(5, 33))
                    })
                    .catch(() => {
                        // eslint-disable-next-line
                        console.log('文件加载失败')
                    })
            ```
        * 多入口: 在entry中写入多个文件入口
    * 懒加载 / 预加载
        * 懒加载: 代码触发时再进行加载
        * 预加载: 在主要代码加载完成后，再加载其他代码
    * PWA(Progressive Web App)
        * 渐进式网络应用开发程序,service worker + cache,使web应用在离线时也可以进行访问
