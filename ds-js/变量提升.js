var name = 'World!';
(function () {
  if (typeof name === 'undefined') {
    var name = 'Jack';
    console.log('Goodbye ' + name);
  } else {
    console.log('Hello ' + name);
  }
})();

// 相当于
var name = 'World!';
(function () {
  var name;
  if (typeof name === 'undefined') {
    name = 'Jack';
    console.log('Goodbye ' + name);
  } else {
    console.log('Hello ' + name);
  }
})();

/**
 * Hello World 因为name已经变成函数内局部变量
 * @type {string}
 */
var str = 'World!';
(function (name) {
  if (typeof name === 'undefined') {
    var name = 'Jack';
    console.log('Goodbye ' + name);
  } else {
    console.log('Hello ' + name);
  }
})(str);

