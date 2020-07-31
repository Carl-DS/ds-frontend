/**
 * filter源码中，会去判断数组的这个索引值是不是数组的一个属性
 * 0 in ary; => true
 3 in ary; => false
 10 in ary; => true
 也就是说 从 3 - 9 都是没有初始化的'坑'!, 这些索引并不存在与数组中. 在 array 的函数调用的时候是会跳过这些'坑'的.
 * @type {number[]}
 */
var ary = [0,1,2];
ary[10] = 10;
let newAry = ary.filter(function(x) { return x === undefined;});
console.log(newAry)
