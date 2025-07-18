import { NgClass } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HysIconPositionDirective } from '@libs/core';

type AppLogoSize = 'small' | 'medium';

@Component({
  imports: [
    HysIconPositionDirective,
    NgClass,
  ],
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './logo.component.scss',
})
export class AppLogoComponent {
  size = input<AppLogoSize>('small');
  withName = input({
    transform: (value: unknown) => booleanAttribute(value)
  });

  withInteraction = input({
    transform: (value: unknown) => booleanAttribute(value)
  });

  logoClass = computed(() => {
    return 'app-logo--' + this.size();
  });
}
