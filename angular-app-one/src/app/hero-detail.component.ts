import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { HeroService } from './hero.service';
import { Hero } from "./hero";

@Component({ // @Component 装饰器为组件提供了Angular元数据.
  selector: 'hero-detail', // CSS 选择器的名字hero-detail 会配置元素的标签名,用于在父组件模板中标记出当前组件的位置
  templateUrl: './hero-detail.component.html'
})

export class HeroDetailComponent implements OnInit{
  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
      .subscribe(hero => this.hero = hero);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  @Input() hero: Hero; // 在hero 属性前面加上@Input 装饰器, 来表明它是一个输入属性
}
