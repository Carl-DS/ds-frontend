import { BrowserModule } from '@angular/platform-browser'; // 引用系统类库
import { NgModule } from '@angular/core'; // 引用系统类库
import { FormsModule } from '@angular/forms'; // 使用ngModel 指令需要的类库

import { AppComponent } from './app.component'; // 引用app.component.ts文件, 定义的AppComponent组件

import { HelloComponent } from './hello/hello.component';
import { HeroDetailComponent } from './hero-detail.component';
import { LinkDirective } from './link.directive';
import { DatefPipe } from './datef.pipe';

@NgModule({ // 定义模块
  declarations: [ // 声明组件
    AppComponent, HelloComponent, LinkDirective, DatefPipe, HeroDetailComponent
  ],
  imports: [
    BrowserModule, // 引用浏览器模块
    FormsModule // 在使用[（ngModel）]绑定之前，将FormsModule引入
  ],
  providers: [],
  bootstrap: [AppComponent, HelloComponent] // 启动组件
})
export class AppModule { } // 输出自定义模块
