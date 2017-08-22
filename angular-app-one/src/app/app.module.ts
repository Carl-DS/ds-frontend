import { BrowserModule } from '@angular/platform-browser'; // 引用系统类库
import { NgModule } from '@angular/core'; // 引用系统类库
import { FormsModule } from '@angular/forms'; // 使用ngModel 指令需要的类库
import { RouterModule } from '@angular/router'; // 添加路由
import { HttpModule } from '@angular/http'; // HTTP 服务

// 导入用于加载和配置内存中的web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component'; // 引用app.component.ts文件, 定义的AppComponent组件
import { HelloComponent } from './hello/hello.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroSearchComponent } from './hero-search.component';
import { LinkDirective } from './link.directive';
import { DatefPipe } from './datef.pipe';
import { HeroService } from './hero.service';
import { DashboardComponent } from './dashboard.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({ // 定义模块
  declarations: [ // 声明组件
    AppComponent, 
    HelloComponent, 
    LinkDirective, 
    DatefPipe, 
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  imports: [
    BrowserModule, // 引用浏览器模块
    FormsModule, // 在使用[（ngModel）]绑定之前，将FormsModule引入
    AppRoutingModule, // 导入路由模块
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  providers: [
    HeroService
  ],
  bootstrap: [AppComponent, HelloComponent] // 启动组件
})

export class AppModule { // 输出自定义模块

} 
