import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Appearance } from './types';

@Component({
  selector: 'lib-card',
  imports: [MatCardModule],
  template: `
    <mat-card [appearance]="appearance()">
      <mat-card-content><ng-content></ng-content></mat-card-content>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  appearance = input<Appearance>('outlined');
}
