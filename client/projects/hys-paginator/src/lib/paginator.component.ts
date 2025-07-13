import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HysSelectComponent } from '@libs/hys-controller';

@Component({
  imports: [
    HysSelectComponent,
  ],
  selector: 'hys-paginator',
  templateUrl: './paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HysPaginatorComponent {

}
