import {Component, Input, OnInit} from '@angular/core'; // 引用系统类库 @angular/core

import { Hero } from './hello'; // 引用定义的Hero 类
import { HeroService } from "./hero.service";

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
  `, // 替换<app-root> 标签的内容
  providers: [HeroService]
})

export class AppComponent implements OnInit{ // 输出自定义组件
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;
  constructor(private heroService: HeroService) {}

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
    // this.getHeroesSlowly();
  }

  getHeroesSlowly(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  };
}
