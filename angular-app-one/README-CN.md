## Angular 官网英雄指南教程学习
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

4. 多个组件 done 

5. 服务 done 困难

  * @Injectable 导入Angular 的Injectable 函数, 并作为@Injectable() 装饰器使用这个函数
  
  * 不要忘了写圆括号!
  
  * 当 TypeScript 看到@Injectable()装饰器时，就会记下本服务的元数据。 如果 Angular 需要往这个服务中注入其它依赖，就会使用这些元数据。

6. 路由

  * 路由定义包括以下部分:

    - Path: 路由器会用它来匹配浏览器地址栏中的地址, 如heroes.
    - Component: 导航到此路由时, 路由器需要创建的组件(HeroesComponent)
    ```
      import { RouterModule }   from '@angular/router';

      RouterModule.forRoot([
        {
          path: 'heroes',
          component: HeroesComponent
        }
      ])
    ```

  * 这里使用了 forRoot() 方法, 因为我们是在应用根部提供配置好的路由器。forRoot()　方法提供了路由需要的路由服务提供商和指令，并基于当前浏览器URL　初始化导航。

7. HTTP

* HttpModule 并不是Angular 的核心模块。它是Angular　用来进行Web　访问的一种可选方式，并位于一个名叫@angular/http 的独立附属模块中。

* 如果报找不到angular-in-memory-web-api，解决方法：npm i angular-in-memory-web-api
