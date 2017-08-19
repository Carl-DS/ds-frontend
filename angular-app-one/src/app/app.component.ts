import { Component, Input } from '@angular/core'; // 引用系统类库 @angular/core
import { Hero } from './hello'; // 引用定义的Hero 类

// 英雄列表
const HEROES: Hero[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

@Component({ // 定义组件
  selector: 'app-root', // 对应该index.html的 <app-root> 标签
  templateUrl: './app.component.html', // html 文件路径
  styleUrls: ['./app.component.css'], // css 文件路径
  template: `
    <h1>{{title}}</h1>
    <h2>My Heroes</h2>
    <ul class="heroes">
      <li *ngFor="let hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
        <!-- each hero goes here -->
        <span class="badge">{{hero.id}}</span>{{hero.name}}
      </li>
    </ul>
    
    <hero-detail [hero]="selectedHero"></hero-detail>
  ` // 替换<app-root> 标签的内容
})

export class AppComponent { // 输出自定义组件
  title = 'Tour of Heroes';
  heroes = HEROES;
  selectedHero : Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
