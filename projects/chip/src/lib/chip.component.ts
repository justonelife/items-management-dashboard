import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SeverityDirective } from '@libs/core';

@Component({
  selector: 'lib-chip',
  template: `
    <ng-content></ng-content>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      inputs: ['severity'],
      directive: SeverityDirective,
    }
  ],
  host: {
    'class': `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors`,
  }
})
export class ChipComponent {

}
