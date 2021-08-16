import '../css/index.css';
import { mul } from './test';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5, 6));

// eslint-disable-next-line
console.log(mul(5, 10))

/*
  1.eslint不认识window、navigator这些全局变量
    解决：需要修改package.json中eslintConfig配置
      "eslintConfig": {
        "extends": "airbnb-base",
        "env": {
          "browser": true
      }
  2.serviceworker必须运行在服务器上
    --> nodejs
    --> npm i serve -g
        serve -s build 启动服务器，将build目录下所有资源作为静态资源暴露出去
 */
// 注册serviceworker
// 处理兼容性问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        // eslint-disable-next-line
        console.log('serviceworker注册成功');
      })
      .catch(() => {
        // eslint-disable-next-line
        console.log('serviceworker注册失败');
      });
  });
}
