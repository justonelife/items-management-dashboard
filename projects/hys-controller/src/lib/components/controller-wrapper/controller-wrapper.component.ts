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
    h-[41px]
    py-2
    px-2
    placeholder:text-[#4c4546]
    bg-white
    border
    border-gray-300
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
