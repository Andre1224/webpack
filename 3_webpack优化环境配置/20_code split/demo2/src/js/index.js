// import '../css/index.css';
import { mul } from './test'; 
import $ from 'jquery';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5, 6));

// eslint-disable-next-line
console.log(mul(5, 10))
// eslint-disable-next-line
console.log($)