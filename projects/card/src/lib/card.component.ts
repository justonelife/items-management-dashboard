import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Appearance } from './types';

@Component({
  selector: 'lib-card',
  imports: [MatCardModule],
  template: `
    <mat-card [appearance]="appearance()">
      @if (header(); as _header) {
        <mat-card-header class="mb-8">
          <mat-card-title>
            <span class="font-semibold text-lg">
            {{ _header }}
            </span>
          </mat-card-title>
        </mat-card-header>
      }
      <mat-card-content><ng-content></ng-content></mat-card-content>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  appearance = input<Appearance>('outlined');
  header = input<string>();
}
