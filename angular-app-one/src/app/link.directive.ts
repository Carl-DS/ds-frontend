import { Directive, ElementRef, HostListener, Renderer } from '@angular/core';
@Directive({
  selector: '[appLink]'
})
export class LinkDirective {
  [x: string]: any;

  constructor(el: ElementRef, renderer: Renderer) {
    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('blue');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('yellow');
  }

  private highlight(color: string) {
    this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
  }
}