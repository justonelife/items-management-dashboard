import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CardComponent } from '@libs/card';
import { HysIconPositionDirective } from '@libs/core';
import { HysButtonComponent } from '@libs/hys-button';
import { HysNumberInputComponent } from '@libs/hys-controller';

@Component({
  imports: [
    HysIconPositionDirective,
    CardComponent,
    HysNumberInputComponent,
    HysButtonComponent,
  ],
  selector: 'app-n-queen-visualizer',
  templateUrl: './n-queen-visualizer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'flex flex-col items-center gap-6'
  }
})
export class NqueenVisualizerComponent {

}
