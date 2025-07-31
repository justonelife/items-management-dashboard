import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HysButtonComponent } from '@libs/hys-button';
import { HysControllerWrapperComponent, HysSelectComponent } from '@libs/hys-controller';

@Component({
  imports: [
    HysSelectComponent,
    HysButtonComponent,
    HysControllerWrapperComponent,
  ],
  selector: 'hys-paginator',
  templateUrl: './paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HysPaginatorComponent {

}
