import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HysIconPositionDirective, IconCombinePosition } from '@libs/core';

@Component({
  selector: 'hys-controller-wrapper',
  template: `
    @if (label(); as _label) {
    <label class="text-md font-semibold fg-primary mb-3 block">{{_label}}</label>
    }
    <div class="
      inline-flex
      items-center
      w-full
      h-[40px]
      py-0
      px-2
      bg-transparent
      border
      border-gray-300
      dark:border-stone-800
      rounded-md
      focus:outline-none
      focus:border-transparent
      focus:ring-1
      focus:ring-black-500
      "
      [hysIconPosition]="iconPosition()"
      [icon]="icon() || ''"
      [iconSet]="iconSet() || ''">
      <ng-content />
    </div>
  `,
  imports: [HysIconPositionDirective],
  styleUrl: './controller-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'flex flex-col'
  },
})
export class HysControllerWrapperComponent {
  label = input<string>('');
  icon = input<string>();
  iconPosition = input<IconCombinePosition>('center left');
  iconSet = input<string>('');
}
