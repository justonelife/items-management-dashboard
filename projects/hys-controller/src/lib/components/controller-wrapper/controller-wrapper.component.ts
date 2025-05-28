import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HysIconPositionDirective } from '@libs/core';

@Component({
  selector: 'hys-controller-wrapper',
  template: `<ng-content />`,
  styleUrl: './controller-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': `inline-flex
    items-center
    w-full
    h-[32px]
    py-0
    px-2
    placeholder:text-[#4c4546]
    bg-secondary
    border
    border-gray-100
    dark:border-stone-800
    rounded-md
    focus:outline-none
    focus:border-transparent
    focus:ring-1
    focus:ring-black-500
    `
  },
  hostDirectives: [
    {
      inputs: ['hysIconPosition', 'icon'],
      directive: HysIconPositionDirective,
    }
  ]
})
export class HysControllerWrapperComponent {
}
