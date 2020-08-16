var data = { name: "yck" };
observe(data);

function update(value) {
  document.querySelector('div').innerText = value;
}

// 模拟解析到｀{{value}}`触发的操作
new Watcher(data, 'name', update)

// get value
let name = data.name;
// change value
data.name = "yyy";

function observe(obj) {
  // 判断类型
  if (!obj || typeof obj !== "object") {
    return;
  }

  Object.keys(obj).forEach((key) => {
    defineReactive(obj, key, obj[key]);
  });
}

function defineReactive(obj, key, val) {
  // 递归子属性
  observe(val);
  let dep = new Dep();
  Object.defineProperty(obj, key, {
    // 可枚举
    enumerable: true,
    // 可配置
    configurable: true,
    // 自定义函数
    get: function reactiveGetter() {
      console.log("get value");
      // 将 Watcher 添加订阅
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return val;
    },
    set: function reactiveSetter(newVal) {
      console.log("change value");
      val = newVal;
      // 执行 watcher 的 update 方法
      dep.notify();
    },
  });
}

// 通过 Dep 解耦属性的依赖和更新操作
class Dep {
  constructor() {
    this.subs = [];
  }

  // 添加依赖
  addSub(sub) {
    this.subs.push(sub);
  }
  // 更新
  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}

// 全局属性，通过该属性配置 Watcher
Dep.target = null;

class Watcher {
  constructor(obj, key, cb) {
    // 将 Dep.target 指向自己
    // 然后触发属性的 getter 添加监听
    // 最后将 Dep.target 置空
    Dep.target = this;
    this.cb = cb;
    this.obj = obj;
    this.key = key;
    this.value = obj[key];
    Dep.target = null;
  }
  update() {
    // 获得新值
    this.value = this.obj[this.key];
    // 调用 update 方法更新 Dom
    this.cb(this.value);
  }
}
