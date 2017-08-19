## Angular 学习
1. 操作步骤1

```
ng new angular-app-one
cd augular-app-one
// ng -serve 命令会启动开发服务器, 监听文件变化, 并在修改这些文件时重新构建此应用
ng -serve --open
```

2. 操作步骤2 改良版
```
ng new angular-app-one --skip-install   后面的参数目的是使用淘宝的镜像来安装
cd my angular-app-one
cnpm install
```

3. 文件说明

```
app/app.components.ts, 一个自定义组件，Typescript代码。
app/app.module.ts, 模块文件，用于组合管理组件，Typescript代码。
app/main.ts, 项目启动的入口，加载ts文件，Typescript代码。
app/app.components.spec.ts, 单测试文件
.gitignore, git的配置文件
index.html, 单页应用的html入口文件
package.json, Node项目的工程配置文件
tsconfig.json, Typescript语言的配置文件
```

4. 修改端口
`ng serve --host 0.0.0.0 --port 4201 --live-reload-port 49153`

5. 模块生成器

命令 | 使用说明
--- | ---
组件Component | ng generate component my-new-component
指令Directive | ng generate directive my-new-directive
服务Service | ng generate service my-new-service
管道Pipe | ng generate pipe my-new-pipe
类Class | ng generate class my-new-class
接口Interface | ng generate interface my-new-interface
枚举对象Enum | ng generate enum my-new-enum
模块Module | ng generate module my-new-module


## Angular 英雄指南教程
1. 简介 done
2. 英雄编辑器 done
3. 主从结构 done
4. 多个组件
5. 服务
6. 路由
7. HTTP
