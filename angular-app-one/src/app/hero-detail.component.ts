import { Component, Input } from '@angular/core';
import { Hero } from "./hello";

@Component({ // @Component 装饰器为组件提供了Angular元数据.
  selector: 'hero-detail', // CSS 选择器的名字hero-detail 会配置元素的标签名,用于在父组件模板中标记出当前组件的位置
  template: `
    <div *ngIf="hero">
      <h2>{{hero.name}} details!</h2>
      <div><label>id: </label> {{hero.id}}</div>

      <div>
        <label>name: </label>
        <input [(ngModel)]="hero.name" placeholder="name"/>
      </div>
    </div>
  `
})

export class HeroDetailComponent {
  @Input() hero: Hero; // 在hero 属性前面加上@Input 装饰器, 来表明它是一个输入属性
}
