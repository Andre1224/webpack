// import '@babel/polyfill';
console.log(1111111);

const add = function add(x, y) {
  return x + y;
};

console.log(add(1, 2));
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('setTimeout is running');
    resolve();
  }, 1000);
});
console.log(promise);
