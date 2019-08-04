/**
 * 观察者模式
 */
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
        },

        // 定义unsubscribe() 方法,用于从函数数组(当所提供的名称对应的事件发出时会执行该数组中的函数)
        // 中移除一个给定的函数
        unsubscribe: function (eventName, callback) {
            var index = 0,
                length = 0;

            if (events.hasOwnProperty(eventName)) {
                length = events[eventName].length;

                // 根据给定的事件名称,循环遍历其对应的数组中所保存的各个函数,并从该数组中移除与
                // 提供的函数(第2个参数) 相匹配的函数
                for (; index < length; index++) {
                    if (events[eventName][index] === callback) {
                        events[eventName].splice(index, 1);
                        break;
                    }
                }
            }
        },

        // 定义publish() 方法,用于依次执行所有与给定的事件名称相关联的所有函数.传给这些函数的参数
        // 都是相同的任意项数据,此数据是作为publish() 的参数传入的
        publish: function (eventName) {
            // 除了第1个参数,把调用publish函数进传入的所有参数保存为一个数组
            var data = Array.prototype.slice.call(arguments, 1),
                index = 0,
                length = 0;

            if (events.hasOwnProperty(eventName)) {
                length = event[eventName].length;

                // 根据给定的事件名称,循环遍历其对应的数组中所保存的各个函数,并依次执行这些函数,
                // 传入所有提供的参数作为这些函数的参数
                for (; index < length; index++) {
                    events[eventName][index].apply(this, data);
                }
            }
        }
    };
}());

// 定义一个模块, 用于Ajax 通信.此模块的依赖是代码清单7-6的观察者对象
(function (observer) {
    
    // 定义一个函数,用于进行Ajax POST,所执行的POST基于所提供的URL,form-encode的数据字符串,
    // 以及一个回调函数.一旦从服务器成功接收到响应数据就执行回调函数
    function ajaxPost(url, data, callback) {
        var xhr = new XMLHttpRequest(),
            STATE_LOADED = 4,
            STATUS_OK = 200;

        xhr.onreadystatechange = function () {
            if (xhr.readyState != STATE_LOADED) {
                return;
            }

            if (xhr.status === STATUS_OK) {
                // 一旦从服务器成功接收到响应数据就执行所提供的回调函数
                callback(xhr.responseText);
            }
        };

        xhr.open("POST", url);

        // 通知服务器,我们将发关表彰编码的数据,这其中的名称和值通过等号(=) 进行分隔,
        // 而每个"名称/值"对通过符号(&)进行分隔
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // 向服务器POST 数据
        xhr.send(data);
    }

    // 订阅全局的,自定义的form-submit事件.当该事件邮代码库中的其他模块发出时,使用所提供的URL和
    // 数据来发出一个Ajax POST 请求.完成后,发出ajax-response事件,并把此次Ajax调用朋服务器所得的
    // 响应数据传入
    observer.subscribe("form-submit", function (response) {
        ajaxPost(url, formData, function (response) {
            // 发出全局事件ajax-response,把Ajax POST 期间从服务器所得到的返回数据传入
            observer.publish("ajax-response", response);
        });
    });
}(observer));

// 定义一个模块,用于处理页面中的一个简单表单的提交事宜,此表单含有若干文本表单域,表单的ID是my-form.
// 本代码清单中的两个模块都没有列出对对方的引用,它们只是引用观察者对象.观察者对象负责处理系统中
// 模块之间的所有联系事宜.每个模块可被称为loosely-coupled(松耦合).因为它们并没有对任何其它模块的
// 硬编码依赖
(function (observer) {
    // 获取对当前HTML 页面中的ID 为my-form 表单的引用
    var form = document.getElementById("my-form"),
    // 从该表单中获取action 标签特性的值,这将是我们实施Ajax POST指向的URL
    action = form.action,
    data = [],
    // 获取对表单中的所有<input>表单域的引用
    fields = form.getElementsByTagName("input"),
    index = 0,
    length = fields.length,
    field,
    // 创建一个HTML <p> 标签,用作在表单的提交发生之后所显示的感谢信息
    thankYouMessage = document.createElement("p");

    // 定义一个函数,在表单提交进执行此函数,引函数使用观察者模式来通过Ajax的方式提交表单域的数据
    function onFormSubmit(e) {

        // 阻止表单提交事件的默认行为,这意味着常规的页面内HTML表单提交将不会发生
        e.preventDefault();

        // 循环遍历表单中的所有<input>标签,把表单中所输入的数据转化成一个由各"名称/值"
        // 对所组成的数组
        for (; index < length; index++) {
            field = fields[index];

            data.push(escape(field.name) + "=" + escape(field.value));
        }
        // 用观察者对象发出全局事件form-submit, 把Ajax POST 指向的URL和所要发送的表单数据传入,
        // Ajax 通信模块正在监听这一事件,并将处理所有与数据提交至服务器相关的事宜
        observer.publish("form-submit", action, data.join("&"));
    }

    // 把onFormSubmit() 函数关联至表单的submit事件
    form.addEventListener("submit", onFormSubmit, false);

    // 订阅全局的,自定义的ajax-response事件,并使用随同该事件传来的服务器响应数据来填充感谢信息
    // 以显示在页面中的表单旁边
    onserver.subscribe("ajax-response", function (response) {
        thankYouMessage.innerHTML = "Thank you for your form submission.<br>The server responseed with: " + response;
        form.parentNode.appendChild(thankYouMessage);
    });

}(observer));