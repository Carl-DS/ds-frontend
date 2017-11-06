// 定义一个包含全局方法publish(),subscribe()和unsubscribe() 的对象,用于实现观察者模式
var observer = (function () {
    // 定义一个对象,用于按事件名称保存所注册的事件以及和该事件相关联的各个回调函数
    // 以便在全代码库中的任意部分(按名称订阅了这些事件的) 使用这些函数
    var events = {};

    return {
        // 定义subscribe() 方法,用于保存一个函数以及和该函数相关联的事件名称.稍后某个时刻
        // 当此名称对应的特定事件发出时,调用该函数
        subscribe: function (eventName, callback) {
            // 如果所提供的名称(第一个参数)对应的事件还没有被订阅,则在events 对象中添加一个属性.
            // 该属性的数据类型为数组,该属性的名称为该事件的名称.以此属性来保存在稍后该名称的事件
            // 发出时所要调用的函数
            if (!events.hasOwnProperty(eventName)) {
                events[eventName] = [];
            }

            // 把所提供的回调函数添加到该关联着特定事件名称的数组中
            events[eventName].push(callback);
        }
    }
})