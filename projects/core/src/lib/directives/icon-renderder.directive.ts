import { ApplicationRef, ComponentRef, createComponent, Directive, effect, ElementRef, EnvironmentInjector, inject, Injectable, InjectionToken, Injector, input, OnInit, Renderer2, SkipSelf, viewChild, ViewContainerRef } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AppAny } from '../types';

export type IconVerticalPostion = 'top' | 'center' | 'bottom';
export type IconHorizontalPosition = 'left' | 'center' | 'right';
export type IconCombinePosition = `${IconVerticalPostion} ${IconHorizontalPosition}`;

const ICON_RENDERER = new InjectionToken<IconRenderder>('ICON_RENDERER');

interface IconRenderder {
  position: IconCombinePosition;
  el: ElementRef;
  renderer: Renderer2;
  vcr: ViewContainerRef;
  helper: HysRendererService;
  render(icon: string): void;
}

@Injectable()
export class HysRendererService {
  renderer = inject(Renderer2);

  addClasses(native: AppAny, ...classes: string[]) {
    classes.forEach(c => this.renderer.addClass(native, c));
  }
}

@Injectable()
export class CenterCenterIconRenderder implements IconRenderder {
  renderer = inject(Renderer2);
  el = inject(ElementRef);
  vcr = inject(ViewContainerRef);
  helper = inject(HysRendererService);
  readonly position = 'center center';

  render(icon: string): void {
    this.helper.addClasses(this.el.nativeElement, 'relative');

    const container = this.renderer.createElement('div');
    this.helper.addClasses(container, 'absolute', 'inset-0', 'flex', 'items-center', 'justify-center');

    const _icon = this.vcr.createComponent(MatIcon)
    _icon.setInput('fontIcon', icon);
    this.renderer.appendChild(container, _icon.location.nativeElement);

    this.renderer.appendChild(this.el.nativeElement, container);
  }
}

@Injectable()
export class CenterLeftIconRenderer implements IconRenderder {
  renderer = inject(Renderer2);
  el = inject(ElementRef);
  vcr = inject(ViewContainerRef);
  helper = inject(HysRendererService);
  readonly position = 'center left';

  render(icon: string): void {
    this.helper.addClasses(this.el.nativeElement, 'flex', 'items-center', 'gap-2');

    const leftColumn = this.renderer.createElement('div');
    this.helper.addClasses(leftColumn, 'order-first', 'h-full', 'flex', 'items-center');

    const _icon = this.vcr.createComponent(MatIcon)
    _icon.setInput('fontIcon', icon);
    this.renderer.appendChild(leftColumn, _icon.location.nativeElement);

    this.renderer.appendChild(this.el.nativeElement, leftColumn);
  }
}

@Injectable()
export class CenterRightIconRenderer implements IconRenderder {
  renderer = inject(Renderer2);
  el = inject(ElementRef);
  vcr = inject(ViewContainerRef);
  helper = inject(HysRendererService);
  readonly position = 'center right';

  render(icon: string): void {
    this.helper.addClasses(this.el.nativeElement, 'flex', 'items-center', 'gap-2');

    const rightColumn = this.renderer.createElement('div');
    this.helper.addClasses(rightColumn, 'order-last', 'h-full', 'flex', 'items-center');

    const _icon = this.vcr.createComponent(MatIcon)
    _icon.setInput('fontIcon', icon);
    this.renderer.appendChild(rightColumn, _icon.location.nativeElement);

    this.renderer.appendChild(this.el.nativeElement, rightColumn);
  }

}

@Directive({
  selector: '[hysIconPosition]',
  standalone: true,
  providers: [
    { provide: HysRendererService, useClass: HysRendererService },
    { provide: ICON_RENDERER, useClass: CenterCenterIconRenderder, multi: true },
    { provide: ICON_RENDERER, useClass: CenterLeftIconRenderer, multi: true },
    { provide: ICON_RENDERER, useClass: CenterRightIconRenderer, multi: true },
  ]
})
export class HysIconPositionDirective {
  renderers = inject<IconRenderder[]>(ICON_RENDERER);

  position = input<IconCombinePosition>('center left', {
    alias: 'hysIconPosition',
  });
  icon = input<string>('');

  constructor() {
    effect(() => {
      const icon = this.icon();
      if (!icon) return;
      const matched = this.renderers.filter(renderer => renderer.position === this.position());
      if (matched.length) {
        matched[0].render(icon);
      }
    });
  }

}

