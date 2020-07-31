/**
 * switch 是严格比较, String 实例和 字符串不一样.
 答案自然是'Do not know'
 所以一般情况下,写switch语句，也建议写default
 * @param value
 */
function showCase(value) {
  switch(value) {
    case 'A':
      console.log('Case A');
      break;
    case 'B':
      console.log('Case B');
      break;
    case undefined:
      console.log('undefined');
      break;
    default:
      console.log('Do not know!');
  }
}
showCase(new String('A'));

/**
 * String('A')就是返回一个字符串
 * @param value
 */
function showCase2(value) {
  switch(value) {
    case 'A':
      console.log('Case A');
      break;
    case 'B':
      console.log('Case B');
      break;
    case undefined:
      console.log('undefined');
      break;
    default:
      console.log('Do not know!');
  }
}
showCase2(String('A'));

