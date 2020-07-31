/**
 * 解释就是第一次使用push,obj对象的push方法设置obj[2] = 1,obj.length++

 解释就是第一次使用push,obj对象的push方法设置obj[3] = 2,obj.length++

 使用console.log()方法输出的时候，因为obj上有length属性和splice方法，故将其作为数组输出打印

 打印时因为数组未设置下标为0和1的值，故打印的结果就是empty，主动获取obj[0] = undefined
 * 代码执行结果 Object(4) [empty × 2, 1, 2, splice: ƒ, push: ƒ]
 * @type {{'2': number, '3': number, splice: {(start: number, deleteCount?: number): unknown[]; (start: number, deleteCount: number, ...items: unknown[]): unknown[]}, length: number, push: (...items: unknown[]) => number}}
 */
var obj = {
  '2': 3,
  '3': 4,
  'length': 2,
  'splice': Array.prototype.splice,
  'push': Array.prototype.push,
}
obj.push(1)
obj.push(2)
console.log(obj)
