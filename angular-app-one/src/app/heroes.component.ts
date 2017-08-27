import {Component, Input, OnInit} from '@angular/core'; // 引用系统类库 @angular/core
import { RouterModule, Router } from '@angular/router'; // 添加路由
import { Hero } from './hero'; // 引用定义的Hero 类
import { HeroService } from "./hero.service";

@Component({ // 定义组件
  selector: 'app-heroes', // 对应该index.html的 <app-root> 标签
  templateUrl: './heroes.component.html', // html 文件路径
  styleUrls: ['./heroes.component.css'], // css 文件路径
})

export class HeroesComponent implements OnInit{ // 输出自定义组件
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private heroService: HeroService, 
    private router: Router
  ) {}

  add(name: string): void {
    name = name.trim();
    if (!name) return;
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }
  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero = hero) { this.selectedHero = null; }
      })
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

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
