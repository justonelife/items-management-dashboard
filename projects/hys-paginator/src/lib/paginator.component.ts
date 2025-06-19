import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HysSelectComponent } from '@libs/hys-controller';

@Component({
  imports: [
    JsonPipe,
    HysSelectComponent,
  ],
  selector: 'hys-paginator',
  templateUrl: './paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HysPaginatorComponent {

}
