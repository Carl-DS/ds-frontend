

//
var formMediator = new Mediator(), loggingMediator = new Mediator();
(function (formMediator) {
    function ajaxPost(url, data, callback) {
        var xhr = new XMLHttpRequest(),
        STATE_LOADED = 4,
        STATUS_OK = 200;
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState != STATE_LOADED) {
                return;
            }

            if (xhr.status === STATUS_OK) {
                callback(xhr.responseText);
            }
        };

        xhr.open("POST", url);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }

    formsMediator.subscribe("form-submit", function (url, formData) {
        ajaxPost(url, formData, function (response) {
            formsMediator.publish("ajax-response", response);
        });
    });
}(formMediator));

// 定义一个模块,用于处理当前页面的一个简单表单的提交事宜.
// 此表单只包含有若干文本表单域,表单ID为my-form. 当表单提交时,会在formsMediator中发出form-submit事件
(function (formMediator) {
    var form = document.getElementById("my-form"),
        data = [],
        fields = form.getElementsByTagName("input"),
        index = 0,
        length = fields.length,
        field,
        thankYouMessage = document.createElement("p");

    function onFormSubmit(e) {
        e.preventDefault();

        
    }
})