const { SyncHook, SyncBailHook, AsyncParallelHook, AsyncSeriesHook } = require('tapable');

class Lesson {
    constructor() {
        // 初始化hooks容器
        this.hooks = {
            // 同步hooks，任务依次执行
            // go: new SyncHook(['address'])
            // SyncBailHook: 一旦有返回值就退出
            go: new SyncBailHook(['address']),
            // 异步hooks
            // AsyncParallelHook: 异步并行
            // leave:new AsyncParallelHook(['name', 'age'])
            // AsyncSeriesHook: 异步串行
            leave:new AsyncSeriesHook(['name', 'age'])
        }
    }
    tap() {
        // 往hooks容器中注册事件/添加回调函数
        this.hooks.go.tap('class0001', (address) => {
            console.log('class0001', address)
            return 1
        })
        this.hooks.go.tap('class0002', (address) => {
            console.log('class0002', address)
            return 2
        })
        this.hooks.leave.tapAsync('class0003', (name, age, cb) => {
            setTimeout(() => {
                console.log('class0003', name, age)
                cb()
            }, 2000)
        })
        this.hooks.leave.tapPromise('class0004', (name, age) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('class0004', name, age)
                    resolve()
                }, 1000)
            })

        })
    }

    start() {
        // 触发hooks
        this.hooks.go.call('class0001')
        this.hooks.leave.callAsync('peter', 15, function () {
            // 代表所有leave所有容器中的函数触发完了，才触发
            console.log('leave触发完了')
        })
    }
}

const l = new Lesson()
l.tap()
l.start()