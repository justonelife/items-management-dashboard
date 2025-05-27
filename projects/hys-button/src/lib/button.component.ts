import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HysIconPositionDirective, IconCombinePosition, SeverityDirective } from '@libs/core';

type IconPosition = 'left' | 'right';
type ButtonVariant = 'normal' | 'icon';

@Component({
  imports: [
    NgTemplateOutlet,
  ],
  selector: 'a[hys-button], button[hys-button]',
  // templateUrl: './button.component.html',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      inputs: ['severity'],
      directive: SeverityDirective,
    },
    {
      inputs: ['hysIconPosition', 'icon'],
      directive: HysIconPositionDirective,
    }
  ],
  styleUrl: './button.component.scss',
  host: {
    '[class]': 'klass()'
  }
})
export class HysButtonComponent {

  iconPosition = input<IconPosition>('left');
  position = computed(() => {
    const iconPosition = this.iconPosition() || 'left';
    return `center ${iconPosition}` as IconCombinePosition;
  });
  icon = input<string>();
  variant = input<ButtonVariant>('normal');

  readonly DEFAULT_CLASS = 'cursor-pointer inline-flex items-center justify-center p-2 px-6';

  klass = computed(() => {
    const variant = this.variant()

    return `${this.DEFAULT_CLASS} ${variant === 'icon' ? 'bg-transparent! text-black! px-2!' : ''}`;
  });

}
