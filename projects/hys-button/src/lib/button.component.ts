import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { HysIconPositionDirective, IconCombinePosition, SeverityDirective } from '@libs/core';

type IconPosition = 'left' | 'right';
type ButtonVariant = 'basic' | 'icon';

@Component({
  imports: [
    MatButtonModule,
    NgTemplateOutlet,
    HysIconPositionDirective,
  ],
  selector: 'a[hys-button], button[hys-button]',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      inputs: ['severity'],
      directive: SeverityDirective,
    }
  ]
})
export class HysButtonComponent {

  iconPosition = input<IconPosition>('left');
  position = computed(() => {
    const iconPosition = this.iconPosition() || 'left';
    return `center ${iconPosition}` as IconCombinePosition;
  });
  icon = input<string>();
  variant = input<ButtonVariant>('basic');

  readonly BUTTON_CLASS = 'cursor-pointer inline-flex! items-center';
  styleClass = input<string>('', { alias: 'class' });
  klass = computed(() => `${this.BUTTON_CLASS} ${this.styleClass()}`);

}
